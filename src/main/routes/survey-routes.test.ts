/* eslint-disable no-undef */
import app from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
let surveyCollection:Collection
let accountCollection:Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without acessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            { answer: 'Answer 1', image: 'http://image-name.com' },
            { answer: 'Answer 2' }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid acessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'luan',
        email: 'luan@gmail.com',
        password: '123',
        role: 'admin'
      })

      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)

      await accountCollection.update({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            { answer: 'Answer 1', image: 'http://image-name.com' },
            { answer: 'Answer 2' }
          ]
        })
        .expect(204)
    })
  })
  describe('GET /surveys', () => {
    test('Should return 403 on load survey without acessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 200 on load survey with valid acessToken', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }],
          date: new Date()
        }
      ])

      const res = await accountCollection.insertOne({
        name: 'luan',
        email: 'luan@gmail.com',
        password: '123'
      })

      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)

      await accountCollection.update({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
