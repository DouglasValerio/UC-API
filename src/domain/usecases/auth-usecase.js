const { MissingParamsError, InvalidParamsError } = require('../../utils/errors')
module.exports = class AuthUseCase {
  constructor (findUserByEmailRepository) {
    this.findUserByEmailRepository = findUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) throw new MissingParamsError('email')
    if (!password) throw new MissingParamsError('password')
    if (!this.findUserByEmailRepository) throw new MissingParamsError('findUserByEmailRepository')
    if (!this.findUserByEmailRepository.findUser) throw new InvalidParamsError('findUserByEmailRepository')
    const userToken = await this.findUserByEmailRepository.findUser(email)
    if (!userToken) return null
  }
}
