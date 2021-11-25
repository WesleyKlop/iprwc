import { jwtVerify } from 'jose'
import User from '../dto/User.js'

const TOKEN_BEARER = 'Bearer'
let JWT_SECRET = null

const getJwtSecret = () => {
  if (!JWT_SECRET) {
    const encoder = new TextEncoder()
    JWT_SECRET = encoder.encode(process.env.JWT_SECRET)
  }
  return JWT_SECRET
}

const extractDataFromToken = async (token) => {
  const { payload } = await jwtVerify(token, getJwtSecret(), {
    issuer: 'urn:io.wesley.iprwc:api',
    audience: 'urn:io.wesley.iprwc:users',
  })
  return payload
}

const injectUserIntoRequest = (req, tokenData) => {
  // We store data for guests in the jwt too.
  // Those do not have a 'sub'.
  if (!('sub' in tokenData)) {
    return
  }

  req.user = new User(
    tokenData.sub,
    tokenData.name,
    tokenData.email,
    tokenData.role,
  )
}

const injectCartIntoRequest = (req, tokenData) => {
  if (!('cart' in tokenData)) {
    req.cart = []
    return
  }

  req.cart = tokenData.cart
}

const middleware = async (req, res, next) => {
  const [type, token] = req.headers.authorization?.split(' ') || []

  if (type !== TOKEN_BEARER) {
    return next()
  }

  try {
    const tokenData = await extractDataFromToken(token)

    // We should not have to use this, but store it just in case.
    req.rawJwtPayloadPleaseBeResponsibleInUsingThis = tokenData

    injectUserIntoRequest(req, tokenData)

    injectCartIntoRequest(req, tokenData)
  } catch (err) {
    return res
      .status(401)
      .json({
        error: 'Unauthorized',
        reason: err.message,
      })
      .end()
  }

  next()
}

export default middleware
