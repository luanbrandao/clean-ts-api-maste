import {
  AddAccount,
  AddAccountParams,
  AccountModel,
  Hasher,
  AddAccountRepository
} from './db-add-account-protocols'
import { LoadAccountByEmailRepository } from '../authentication/db-authentication-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher : Hasher,
    private readonly addAccountRepository:AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AccountModel|null> {
    // aqui não precisa de try/catch, pois o controller já trata a exceção

    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)

      const newAccount = await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: hashedPassword }
        ))

      return new Promise(resolve => resolve(newAccount))
    }

    return null
  }
}
