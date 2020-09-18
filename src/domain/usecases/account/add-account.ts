import { AccountModel } from '../../models/account'

// export type AddAccountModel = {
//   name: string;
//   email: string;
//   password:string;
// }
export type AddAccountModel = Omit<AccountModel, 'id'>

// AccountModel: entidade do banco de dados
export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel|null>
}
