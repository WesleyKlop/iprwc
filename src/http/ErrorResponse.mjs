import BaseResponse from './BaseResponse.mjs'

export default class ErrorResponse extends BaseResponse {
  constructor(req, err) {
    super(req)
    this.error = err
    this.status = err.status ?? 500
  }

  /**
   *
   * @param {e.Request} req
   * @param {AppError} err
   * @returns {ErrorResponse}
   */
  static from(req, err = null) {
    return new ErrorResponse(req, err)
  }

  withError(err) {
    this.error = err
    this.status = err.status ?? 500
    return this
  }

  async send(res) {
    return res
      .status(this.status)
      .json({
        error: this.error.toJSON(),
        meta: {
          ...this.meta,
          jwt: this.jwt,
        },
      })
      .end()
  }
}
