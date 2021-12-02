export default class BaseResponse {
  constructor(req) {
    this.req = req
    this.jwt = req.jwt
    this.status = 200
    this.meta = {}
  }

  withJwt(jwt) {
    this.jwt = jwt
    return this
  }

  withMeta(meta) {
    this.meta = meta
    return this
  }

  withStatus(status) {
    this.status = status
    return this
  }
}
