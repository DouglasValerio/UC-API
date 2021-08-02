const { MissingParamsError } = require('../../utils/errors')
module.exports = class AuthUseCase {
  constructor (findUserByEmailRepository, encrypter, tokenGenerator) {
    this.findUserByEmailRepository = findUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!email) throw new MissingParamsError('email')
    if (!password) throw new MissingParamsError('password')
    const user = await this.findUserByEmailRepository.findUser(email)
    if (!user) return null
    const isPasswordValid = await this.encrypter.compare(password, user.password)
    if (!isPasswordValid) return null
    const accessToken = await this.tokenGenerator.createToken(user.id)
    return accessToken
  }
}
