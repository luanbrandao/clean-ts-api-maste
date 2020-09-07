import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { AccountModel } from '../../../domain/models/account'
import { Decrypter } from '../../protocols/criptography/decrypter'

export class DbLoadAccountbyToken implements LoadAccountByToken {
  constructor (private readonly decrypter : Decrypter) {}

  async load (accessToken: string, _role?: string): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
