import AppError from './AppError.mjs'

export default class ValidationError extends AppError {
  constructor(errors) {
    super('Validation error')
    this.status = 422
    this.errors = errors
  }

  toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors,
    }
  }
}
