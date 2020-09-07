import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccountModel } from '../../domain/models/account'

const makeFakeAccount = (): AccountModel => ({

  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'hashed_password'
})

describe('Name of the group', () => {
  test('Should return 403 id no x-access-token exists in headers', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (_account: string): Promise<AccountModel|null> {
        return Promise.resolve(makeFakeAccount())
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should calls LoadAccountByToken if correct accessToken', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (_account: string): Promise<AccountModel|null> {
        return Promise.resolve(makeFakeAccount())
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByTokenStub)

    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })

    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
