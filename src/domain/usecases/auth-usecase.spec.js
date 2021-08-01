
const { MissingParamsError } = require('../../utils/errors')
class AuthUseCase {
  async auth (email) {
    if (!email) throw new MissingParamsError('email')
  }
}

describe('Auth Usecase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const accessTokenPromise = sut.auth()
    expect(accessTokenPromise).rejects.toThrow(new MissingParamsError('email'))
  })
})
