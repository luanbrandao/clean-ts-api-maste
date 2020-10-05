import { AddAccount, AddAccountParams, AccountModel } from '@/presentation/controllers/login/signup/signup-controller-protocols'
import { mockAccountModel } from '@/domain/test'

import { Authentication, AuthenticationParams } from '@/presentation/controllers/login/login/login-controller-protocols'
import { LoadAccountByToken } from '@/presentation/middlewares/authmiddleware-protocols'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (_account: AddAccountParams): Promise<AccountModel> {
      // const fakeAccount = {
      //   id: 'valid_id',
      //   name: 'valid_name',
      //   email: 'valid_email@mail.com',
      //   password: 'valid_password'
      // }
      return Promise.resolve(mockAccountModel())
    }
  }

  // const emailValidatorStub:EmailValidator = new EmailValidatorStub()
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (_authentication: AuthenticationParams):Promise<string> {
      return Promise.resolve('any_token')
    }
  }

  return new AuthenticationStub()
}

export const mockLoadAccountByToken = () : LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (_account: string): Promise<AccountModel|null> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenStub()
}
