module.exports = class MissingParamsError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamsError'
  }
}
