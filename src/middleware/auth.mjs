import { extractDataFromToken } from '../services/jwt.mjs'

const TOKEN_BEARER = 'Bearer'

const middleware = async (req, res, next) => {
  const [type, token] = req.headers.authorization?.split(' ') || []

  if (type !== TOKEN_BEARER) {
    return next()
  }

  try {
    req.jwtPayload = await extractDataFromToken(token)
    req.jwt = token
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
