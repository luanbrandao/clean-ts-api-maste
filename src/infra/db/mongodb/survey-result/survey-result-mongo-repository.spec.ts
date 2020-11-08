import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }, {
        answer: 'other_answer'
      }, {
        answer: 'any_answer_3'
      }],
    date: new Date()
  })

  // return res.ops[0]
  return MongoHelper.map(res.ops[0])
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_passwpord'
  })

  // return res.ops[0]
  return MongoHelper.map(res.ops[0])
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result id its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()

      // const surveyResult = await sut.save({
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultCollection.findOne({
        surveyId: survey.id,
        accountId: account.id
      })
      expect(surveyResult).toBeTruthy()
      // expect(surveyResult.surveyId).toEqual(survey.id)
      // expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
      // expect(surveyResult.answers[0].count).toBe(1)
      // expect(surveyResult.answers[0].percent).toBe(100)
      // expect(surveyResult.answers[1].count).toBe(0)
      // expect(surveyResult.answers[1].percent).toBe(0)
    })

    test('Should update  survey result id its not new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()

      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const sut = makeSut()

      // const surveyResult = await sut.save({
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultCollection
        .find({
          surveyId: survey.id,
          accountId: account.id
        })
        .toArray()

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
      // expect(surveyResult.surveyId).toEqual(survey.id)
      // // ensure update
      // expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
      // expect(surveyResult.answers[0].count).toBe(1)
      // expect(surveyResult.answers[0].percent).toBe(100)
      // expect(surveyResult.answers[1].percent).toBe(0)
      // expect(surveyResult.answers[1].percent).toBe(0)
    })
  })
})

describe('loadBySurveyId()', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should load  survey result', async () => {
    const survey = await makeSurvey()
    const account = await makeAccount()

    await surveyResultCollection.insertMany([
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }
    ])

    const sut = makeSut()
    const surveyResult = await sut.loadBySurveyId(survey.id)

    expect(surveyResult).toBeTruthy()
    expect(surveyResult.surveyId).toEqual(survey.id)
    expect(surveyResult.answers[0].count).toBe(2)
    expect(surveyResult.answers[0].percent).toBe(50)
    expect(surveyResult.answers[1].count).toBe(2)
    expect(surveyResult.answers[1].percent).toBe(50)
    expect(surveyResult.answers[2].count).toBe(0)
    expect(surveyResult.answers[2].percent).toBe(0)
  })
})
