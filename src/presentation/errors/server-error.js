module.exports = class ServerError extends Error {
  constructor (paramName) {
    super('server error')
    this.name = 'ServerError'
  }
}
