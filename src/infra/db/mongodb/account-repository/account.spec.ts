/* eslint-disable no-undef */
import { AccountMongoRepository } from './account'
import { MongoHelper } from '../helpers/mongo-helper'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    console.log('OK ok oko o ko k')
    const sut = new AccountMongoRepository()

    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_passwpord'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@gmail.com')
    expect(account.password).toBe('any_passwpord')
  })
})
