class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('Email Validator', () => {
  test('Should retur true if validator returns true', async () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_mail@mail.com')
    expect(isEmailValid).toBe(true)
  })
})
