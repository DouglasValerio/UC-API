const validator = require('validator')
class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}
const makeSut = () => new EmailValidator()

describe('Email Validator', () => {
  test('Should retur true if validator returns true', async () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_mail@mail.com')
    expect(isEmailValid).toBe(true)
  })
  test('Should retur false if validator returns false', async () => {
    const sut = makeSut()
    validator.isEmailValid = false
    const isEmailValid = sut.isValid('invalid_mail@mail.com')
    expect(isEmailValid).toBe(false)
  })
})
