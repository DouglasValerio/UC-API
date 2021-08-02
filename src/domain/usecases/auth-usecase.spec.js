
const { MissingParamsError } = require('../../utils/errors')
const AuthUseCase = require('./auth-usecase')
const makeSut = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
    }
  }
  const encrypterSpy = new EncrypterSpy()
  class FindUserByEmailRepositorySpy {
    async findUser (email) {
      this.email = email
      return this.user
    }
  }
  const findUserByEmailRepositorySpy = new FindUserByEmailRepositorySpy()
  findUserByEmailRepositorySpy.user = { password: 'hashed_password' }
  const sut = new AuthUseCase(findUserByEmailRepositorySpy, encrypterSpy)
  return { sut, findUserByEmailRepositorySpy, encrypterSpy }
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
    await expect(authPromise).rejects.toThrow()
  })
  test('Should throw if findUserByEmailRepository has no findUser method', async () => {
    const sut = new AuthUseCase({})
    const authPromise = sut.auth('any_mail@mail.com', 'any_password')
    await expect(authPromise).rejects.toThrow()
  })
  test('Should return null if invalid email is provided', async () => {
    const { sut, findUserByEmailRepositorySpy } = makeSut()
    findUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_mail@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })
  test('Should return null if invalid password is provided', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('valid_mail@mail.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })
  test('Should call Encrypter with correct values', async () => {
    const { sut, findUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth('valid_mail@mail.com', 'any_password')
    expect(encrypterSpy.password).toBe('any_password')
    expect(encrypterSpy.hashedPassword).toBe(findUserByEmailRepositorySpy.user.password)
  })
})
