import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountbyToken } from './db-load-account-by-token'

interface SutTypes {
  sut: DbLoadAccountbyToken,
  decrypterStub:Decrypter
}
const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (_value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountbyToken(decrypterStub)
  return { sut, decrypterStub }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypt with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
