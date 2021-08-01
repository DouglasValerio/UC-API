const HttpResponse = require('../helpers/http-response')
const { MissingParamsError, InvalidParamsError } = require('../../utils/errors')
module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) return HttpResponse.badRequest(new MissingParamsError('email'))
      if (!this.emailValidator.isValid(email)) return HttpResponse.badRequest(new InvalidParamsError('email'))
      if (!password) return HttpResponse.badRequest(new MissingParamsError('password'))
      const accessToken = await this.authUseCase.auth(email, password)
      if (accessToken) return HttpResponse.ok({ accessToken })
      return HttpResponse.unauthorizedError()
    } catch (error) {
      // register error to some log service
      return HttpResponse.serverError()
    }
  }
}
