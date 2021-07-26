const HttpResponse = require('../helpers/http-response')
module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) return HttpResponse.badRequest('email')
      if (!password) return HttpResponse.badRequest('password')
      const accessToken = this.authUseCase.auth(email, password)
      if (accessToken) return HttpResponse.ok({ accessToken })
      return HttpResponse.unauthorizedError()
    } catch (error) {
      // register error to some log service
      return HttpResponse.serverError()
    }
  }
}