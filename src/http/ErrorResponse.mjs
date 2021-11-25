import BaseResponse from './BaseResponse.mjs'

export default class ErrorResponse extends BaseResponse {
  constructor(req, err) {
    super(req)
    this.error = err
    this.status = 500
  }

  static from(req, err) {
    return new ErrorResponse(req, err)
  }

  withStatus(status) {
    if (status < 400) {
      throw new Error('Status must be >= 400')
    }

    return super.withStatus(status)
  }

  async send(res) {
    return res
      .status(this.status)
      .json({
        error: this.error,
        meta: {
          ...this.meta,
          jwt: this.jwt,
        },
      })
      .end()
  }
}
