const MissingParamsError = require('./missing-params-error')
module.exports = class HttpResponse {
  static badRequest (param) {
    return { statusCode: 400, body: new MissingParamsError(param) }
  }

  static serverError () {
    return { statusCode: 500 }
  }
}
