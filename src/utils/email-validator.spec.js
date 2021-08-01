const validator = require('validator')
class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

describe('Email Validator', () => {
  test('Should retur true if validator returns true', async () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_mail@mail.com')
    expect(isEmailValid).toBe(true)
  })
  test('Should retur false if validator returns false', async () => {
    const sut = new EmailValidator()
    validator.isEmailValid = false
    const isEmailValid = sut.isValid('invalid_mail@mail.com')
    expect(isEmailValid).toBe(false)
  })
})
