export default class JsonResponse {
  constructor(jwt, data, statusCode = 200) {
    this.data = data
    this.statusCode = statusCode
  }

  send(res) {
    res
      .status(this.statusCode)
      .json({
        data: this.data,
        meta: {
          jwt: this.jwt,
        },
      })
      .end()
  }
}
