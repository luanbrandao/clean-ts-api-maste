import {
  AddAccount,
  AddAccountModel,
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

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    // aqui não precisa de try/catch, pois o controller já trata a exceção

    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    const hashedPassword = await this.hasher.hash(accountData.password)

    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword }
      ))

    return new Promise(resolve => resolve(account))
  }
}
