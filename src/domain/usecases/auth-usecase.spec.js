
const { MissingParamsError } = require('../../utils/errors')
class AuthUseCase {
  async auth (email, password) {
    if (!email) throw new MissingParamsError('email')
    if (!password) throw new MissingParamsError('password')
  }
}

describe('Auth Usecase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const accessTokenPromise = sut.auth()
    expect(accessTokenPromise).rejects.toThrow(new MissingParamsError('email'))
  })
  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const accessTokenPromise = sut.auth('any_mail@mail.com')
    expect(accessTokenPromise).rejects.toThrow(new MissingParamsError('password'))
  })
})
