import AppError from './AppError.mjs'

export default class WrappedError extends AppError {
  constructor(original) {
    super(original.message)
    this.original = original
  }

  toJSON() {
    return super.toJSON()
  }
}
