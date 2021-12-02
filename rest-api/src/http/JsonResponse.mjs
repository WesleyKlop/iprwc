import { createToken } from '../services/jwt.mjs'
import BaseResponse from './BaseResponse.mjs'

export default class JsonResponse extends BaseResponse {
  static from(req) {
    return new JsonResponse(req)
  }

  withData(data) {
    this.data = data
    return this
  }

  withJwtPayload(payload) {
    this.jwtPayload = payload
    return this
  }

  getJwt() {
    if ('jwtPayload' in this) {
      return (this.jwt = createToken(this.jwtPayload))
    }
    return this.jwt
  }

  async send(res) {
    return res
      .status(this.status)
      .json({
        data: this.data,
        meta: {
          ...this.meta,
          jwt: await this.getJwt(),
        },
      })
      .end()
  }
}
