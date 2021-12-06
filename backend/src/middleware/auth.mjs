import { extractDataFromToken } from '../services/jwt.mjs'

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
    next(err)
  }
}

export default middleware
