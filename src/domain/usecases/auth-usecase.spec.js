
const { MissingParamsError, InvalidParamsError } = require('../../utils/errors')
const AuthUseCase = require('./auth-usecase')
const makeSut = () => {
  class FindUserByEmailRepositorySpy {
    async findUser (email) {
      this.email = email
    }
  }
  const findUserByEmailRepositorySpy = new FindUserByEmailRepositorySpy()
  const sut = new AuthUseCase(findUserByEmailRepositorySpy)
  return { sut, findUserByEmailRepositorySpy }
}

describe('Auth Usecase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const accessTokenPromise = sut.auth()
    await expect(accessTokenPromise).rejects.toThrow(new MissingParamsError('email'))
  })
  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const accessTokenPromise = sut.auth('any_mail@mail.com')
    await expect(accessTokenPromise).rejects.toThrow(new MissingParamsError('password'))
  })
  test('Should call FindUserByEmailRepository with correct email', async () => {
    const { sut, findUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any_mail@mail.com', 'any_password')
    expect(findUserByEmailRepositorySpy.email).toBe('any_mail@mail.com')
  })
  test('Should throw if no repository is provided', async () => {
    const sut = new AuthUseCase()
    const authPromise = sut.auth('any_mail@mail.com', 'any_password')
    await expect(authPromise).rejects.toThrow(new MissingParamsError('findUserByEmailRepository'))
  })
  test('Should throw if findUserByEmailRepository has no findUser method', async () => {
    const sut = new AuthUseCase({})
    const authPromise = sut.auth('any_mail@mail.com', 'any_password')
    await expect(authPromise).rejects.toThrow(new InvalidParamsError('findUserByEmailRepository'))
  })
  test('Should return null if findUserByEmailRepository retunrs null', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('invalid_mail@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })
})
