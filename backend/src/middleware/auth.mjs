import { createToken, extractDataFromToken } from '../services/jwt.mjs'
import { errors } from 'jose'
import AuthError from '../errors/AuthError.mjs'

const TOKEN_BEARER = 'Bearer'

/**
 *
 * @param {AppRequest} req
 * @param {AppResponse} res
 * @param {unknown} next
 * @returns {Promise<unknown>}
 */
const middleware = async (req, res, next) => {
  const [type, token] = req.headers.authorization?.split(' ') || []

  if (type !== TOKEN_BEARER) {
    return next()
  }

  try {
    req.jwtPayload = await extractDataFromToken(token)
    // Refresh the jwt when it almost expires (1 week)
    if (req.jwtPayload.exp - Date.now() < 1000 * 60 * 60 * 24 * 7) {
      req.jwt = await createToken(req.jwtPayload)
    } else {
      req.jwt = token
    }
    next()
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      throw AuthError.unauthenticated('Token expired')
    }
    next(err)
  }
}

export default middleware
