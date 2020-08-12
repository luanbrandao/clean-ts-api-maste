import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string;
  email: string;
  password:string;
}

// AccountModel: entidade do banco de dados
export interface AddAccount {
  add (account: AddAccountModel): AccountModel
}
