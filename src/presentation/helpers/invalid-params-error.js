module.exports = class InvalidParamsError extends Error {
  constructor (paramName) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamsError'
  }
}
