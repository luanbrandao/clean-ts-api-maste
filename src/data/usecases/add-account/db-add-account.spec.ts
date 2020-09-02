/* eslint-disable no-undef */
import { DbAddAccount } from './db-add-account'
import { Hasher, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account-protocols'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (_value :string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

// Problema: a camade de infra está se comunicando diretamento com a de domain;
// solução 1: manter assim
// solução 2: replicar os models no data, desvantagem de models duplicados

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (_accountData : AddAccountModel): Promise<AccountModel> {
      // const fakeAccount = {
      //   id: 'valid_id',
      //   name: 'valid_name',
      //   email: 'valid_email',
      //   password: 'hashed_password'
      // }
      // return new Promise(resolve => resolve(fakeAccount))
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({

  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

interface SutTypes {
  sut: DbAddAccount,
  hasherStub:Hasher,
  addAccountRepositoryStub:AddAccountRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const encryptSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()

    // a dependência está retornando uma exceção
    jest.spyOn(hasherStub, 'hash').mockResolvedValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.add(makeFakeAccountData())
    // a classe encrypter não pode tratar e exceção, pois ela já é tratada no controller.
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    // a dependência está retornando uma exceção
    jest.spyOn(addAccountRepositoryStub, 'add').mockResolvedValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promise = sut.add(makeFakeAccountData())
    // a classe encrypter não pode tratar e exceção, pois ela já é tratada no controller.
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.add(makeFakeAccountData())

    // expect(account).toEqual({
    //   id: 'valid_id',
    //   name: 'valid_name',
    //   email: 'valid_email',
    //   password: 'hashed_password'
    // })
    expect(account).toEqual(makeFakeAccount())
  })
})
