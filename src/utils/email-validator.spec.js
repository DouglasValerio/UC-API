const validator = require('validator')
const EmailValidator = require('./email-validator')

const makeSut = () => new EmailValidator()

describe('Email Validator', () => {
  test('Should return true if validator returns true', async () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_mail@mail.com')
    expect(isEmailValid).toBe(true)
  })
  test('Should return false if validator returns false', async () => {
    const sut = makeSut()
    validator.isEmailValid = false
    const isEmailValid = sut.isValid('invalid_mail@mail.com')
    expect(isEmailValid).toBe(false)
  })
  test('Should call validator with correct email', async () => {
    const sut = makeSut()
    sut.isValid('any_mail@mail.com')
    expect(validator.email).toBe('any_mail@mail.com')
  })
})
