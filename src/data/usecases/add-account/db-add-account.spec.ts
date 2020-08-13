import { DbAddAccount } from './add-account'

/* eslint-disable no-undef */
describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value = 'hashed_password'): Promise<string> {
        return new Promise(resolve => resolve(value))
      }
    }
    const encrypterStub = new EncrypterStub()

    const sut = new DbAddAccount(encrypterStub)

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
