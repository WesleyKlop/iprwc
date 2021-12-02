import { AppError } from './AppError'

export class AuthenticationError extends AppError {
  private code: 401 | 403

  constructor(message: string, code: 401 | 403) {
    super(message)
    this.code = code
  }

  unauthorized() {
    return this.code === 403
  }

  unauthenticated() {
    return this.code === 401
  }
}
