import { AccountModel } from '../models/account'

export interface LoadAccountByToken {
  load (account: string, role?:string): Promise<AccountModel|null>
}
