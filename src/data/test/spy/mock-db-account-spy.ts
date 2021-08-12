// import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
// import { AccountModel, AddAccountParams } from '@/data/usecases/account/add-account/db-add-account-protocols'
// import { mockAccountModel } from '@/domain/test'
// import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
// import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
// import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'

// import faker from 'faker'

// export class AddAccountRepositorySpy implements AddAccountRepository {
//   params: AddAccountParams | undefined;
//   result = true

//   async add (accountData : AddAccountParams): Promise<AccountModel|null> {
//     this.params = accountData
//     return Promise.resolve(mockAccountModel())
//   }
// }

// export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
//   email: string = ''
//   result = {
//     id: faker.random.uuid(),
//     name: faker.name.findName(),
//     password: faker.internet.password()
//   }

//   async loadByEmail (email: string):Promise<AccountModel> {
//     this.email = email
//     return Promise.resolve(mockAccountModel())
//   }
// }

// export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
//   token: string = ''
//   role: string | undefined = ''
//   result = {
//     id: faker.random.uuid()
//   }

//   async loadByToken (token: string, role?:string):Promise<AccountModel|null> {
//     this.token = token
//     this.role = role
//     return Promise.resolve(mockAccountModel())
//   }
// }

// export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
//   id: string = ''
//   token: string = ''

//   async updateAccessToken (id: string, token:string):Promise<void> {
//     this.id = id
//     this.token = token
//   }
// }
