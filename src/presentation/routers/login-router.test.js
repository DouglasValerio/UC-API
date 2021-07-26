
const LoginRouter = require('../routers/login-router')
const MissingParamsError = require('../helpers/missing-params-error')

const makeSut = () => {
  return new LoginRouter()
}
describe('Login Router', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'asahsuas'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('email'))
  })
  test('Should return 400 if no password is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'test@test.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('password'))
  })
  test('Should return 500 if no httpRequest is provided', async () => {
    const sut = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 500 if no httpRequest has no body', async () => {
    const sut = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should call AuthUsecase with correct params', async () => {
    const sut = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
