import AppError from '../errors/AppError.mjs'
import BaseResponse from './BaseResponse.mjs'

export default class ValidationErrorResponse extends BaseResponse {
  /**
   * @param {e.Request} req
   * @param {import('yup').ValidationError} err
   */
  constructor(req, err) {
    super(req)
    this.error = err
    this.status = 422
  }

  /**
   * @param {e.Request} req
   * @param {import('yup').ValidationError} err
   */
  static from(req, err = null) {
    return new ValidationErrorResponse(req, err)
  }

  async send(res) {
    return res
      .status(this.status)
      .json({
        errors: [
          {
            message: this.error.errors[0],
            field: this.error.path,
            type: this.error.type,
          },
        ],
        meta: {
          ...this.meta,
          jwt: this.jwt,
        },
      })
      .end()
  }
}
