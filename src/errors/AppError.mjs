export default class AppError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }

  /**
   * @abstract
   * @returns {Record<string, any>}
   */
  toJSON() {
    return {
      message: this.message,
    }
  }
}
