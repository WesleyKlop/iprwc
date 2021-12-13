import { extractDataFromToken } from '../services/jwt.mjs'
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
    req.jwt = token
    next()
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      throw AuthError.unauthenticated('Token expired')
    }
    next(err)
  }
}

export default middleware
