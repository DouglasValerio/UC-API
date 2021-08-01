
class AuthUseCase {
  async auth (email) {
    if (!email) throw new Error()
  }
}

describe('Auth Usecase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const accessTokenPromise = sut.auth()
    expect(accessTokenPromise).rejects.toThrow()
  })
})