const HttpResponse = require('../helpers/http-response')
const MissingParamsError = require('../helpers/missing-params-error')
const InvalidParamsError = require('../helpers/invalid-params-error')
module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) return HttpResponse.badRequest(new MissingParamsError('email'))
      if (!/mail/.test(email)) return HttpResponse.badRequest(new InvalidParamsError('email'))
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
