const MissingParamsError = require('./missing-params-error')
const UnauthorizedError = require('./unauthorized-error')
module.exports = class HttpResponse {
  static badRequest (param) {
    return { statusCode: 400, body: new MissingParamsError(param) }
  }

  static serverError () {
    return { statusCode: 500 }
  }

  static unauthorizedError () {
    return { statusCode: 401, body: new UnauthorizedError() }
  }

  static ok () {
    return { statusCode: 200 }
  }
}
