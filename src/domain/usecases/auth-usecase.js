const { MissingParamsError } = require('../../utils/errors')
module.exports = class AuthUseCase {
  constructor (findUserByEmailRepository, encrypter) {
    this.findUserByEmailRepository = findUserByEmailRepository
    this.encrypter = encrypter
  }

  async auth (email, password) {
    if (!email) throw new MissingParamsError('email')
    if (!password) throw new MissingParamsError('password')
    const user = await this.findUserByEmailRepository.findUser(email)
    if (!user) return null
    await this.encrypter.compare(password, user.password)
    return null
  }
}
