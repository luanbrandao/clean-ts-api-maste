import { LoadAccountByToken, AccountModel, Decrypter, LoadAccountByTokenRepository } from './db-load-account-by-token-protocols'

export class DbLoadAccountbyToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter : Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    let token: any
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }

    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }

    return null
  }
}
