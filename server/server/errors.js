/**
 * @class
 * An error with status code information.
 */
class ServerError extends Error {
  /**
   * @param {string} message
   * @param {string|number} statusCode 
   */
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

module.exports = {
  ServerError,
}
