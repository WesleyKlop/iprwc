import AuthError from '../errors/AuthError.mjs'

export const guest = (req, res, next) => {
  if (req.user) {
    throw AuthError.forbidden('You do not have permission to access this route')
  }
  next()
}

export const admin = (req, res, next) => {
  if (!req.user) {
    throw AuthError.unauthenticated(
      'You must be authenticated to access this route',
    )
  }
  if (req.user.role !== 'ADMIN') {
    throw AuthError.forbidden('You do not have permission to access this route')
  }
  next()
}

export const user = (req, res, next) => {
  if (!req.user) {
    throw AuthError.unauthenticated(
      'You must be authenticated to access this route',
    )
  }
  if (req.user.role !== 'USER') {
    throw AuthError.forbidden('You do not have permission to access this route')
  }
  next()
}
