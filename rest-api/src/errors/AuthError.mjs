import AppError from './AppError.mjs'

export default class AuthError extends AppError {
  constructor(message, status) {
    super(message)
    this.status = status
  }

  static forbidden(message) {
    return new AuthError(message, 403)
  }

  static unauthenticated(message) {
    return new AuthError(message, 401)
  }

  toJSON() {
    return super.toJSON()
  }
}
