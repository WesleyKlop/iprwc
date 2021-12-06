import AppError from './AppError.mjs'

export default class NotFoundError extends AppError {
  constructor(model, id) {
    super(`"${model}" with id "${id}" not found`)
    this.status = 404
    this.model = model
    this.id = id
  }

  toJSON() {
    return {
      model: this.model.toLowerCase(),
      id: this.id,
      ...super.toJSON(),
    }
  }
}
