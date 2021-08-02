const { MissingParamsError } = require('../../utils/errors')
module.exports = class AuthUseCase {
  constructor (findUserByEmailRepository) {
    this.findUserByEmailRepository = findUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) throw new MissingParamsError('email')
    if (!password) throw new MissingParamsError('password')
    const userToken = await this.findUserByEmailRepository.findUser(email)
    if (!userToken) return null
    return null
  }
}
