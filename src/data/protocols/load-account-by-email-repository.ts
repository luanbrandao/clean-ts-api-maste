import { AccountModel } from '../../domain/models/account'

export interface LoadAccountByEmailRepository{
  load (_email: string):Promise<AccountModel>
}
