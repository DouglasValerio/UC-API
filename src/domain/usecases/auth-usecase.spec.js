
const { MissingParamsError } = require('../../utils/errors')
class AuthUseCase {
  constructor (findUserByEmailRepository) {
    this.findUserByEmailRepository = findUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) throw new MissingParamsError('email')
    if (!password) throw new MissingParamsError('password')
    await this.findUserByEmailRepository.findUser(email)
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
  test('Should call FindUserByEmailRepository with correct email', async () => {
    class FindUserByEmailRepositorySpy {
      async findUser (email) {
        this.email = email
      }
    }
    const findUserByEmailRepositorySpy = new FindUserByEmailRepositorySpy()
    const sut = new AuthUseCase(findUserByEmailRepositorySpy)
    await sut.auth('any_mail@mail.com', 'any_password')
    expect(findUserByEmailRepositorySpy.email).toBe('any_mail@mail.com')
  })
})
