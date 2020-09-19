import { AccountModel, Decrypter, LoadAccountByTokenRepository } from './db-load-account-by-token-protocols'
import { DbLoadAccountbyToken } from './db-load-account-by-token'
const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (_value: string): Promise<string|null> {
      return Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'hashed_password'
})

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (_token: string, _role?:string):Promise<AccountModel|null> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAccountbyToken,
  decrypterStub:Decrypter,
  loadAccountByTokenRepositoryStyb: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStyb = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountbyToken(decrypterStub, loadAccountByTokenRepositoryStyb)
  return { sut, decrypterStub, loadAccountByTokenRepositoryStyb }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypt with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returnss null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))

    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should calls LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStyb } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStyb, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should retrun null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStyb } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStyb, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should retrun a account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStyb } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStyb, 'loadByToken').mockResolvedValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})