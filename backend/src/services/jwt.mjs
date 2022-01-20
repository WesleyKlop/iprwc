import crypto from 'crypto'
import { jwtVerify, SignJWT } from 'jose'

let JWT_SECRET = null

const ISSUER = 'urn:io.wesley.iprwc:api'
const AUDIENCE = 'urn:io.wesley.iprwc:users'

const getJwtSecret = () => {
  if (!JWT_SECRET) {
    JWT_SECRET = crypto.createSecretKey(process.env.JWT_SECRET)
  }
  return JWT_SECRET
}

/**
 * @param {string} token
 * @returns {Promise<JwtPayload & Record<string, *>>}
 */
export const extractDataFromToken = async (token) => {
  const { payload } = await jwtVerify(token, getJwtSecret(), {
    issuer: ISSUER,
    audience: AUDIENCE,
  })
  return payload
}

/**
 * @param {JwtPayload} payload
 * @returns {Promise<string>}
 */
export const createToken = (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime('8h')
    .sign(getJwtSecret())
}
