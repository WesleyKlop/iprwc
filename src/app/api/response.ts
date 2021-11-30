export interface Response<R> {
  data: R
  meta: {
    jwt?: string
  }
}
