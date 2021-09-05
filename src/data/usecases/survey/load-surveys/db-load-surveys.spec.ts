import { LoadSurveysRepository } from './add-survey-repository-protocols'

import Mockdate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'
import { throwError, mockSurveysModel } from '@/domain/test'
import { mockLoadSurveysRepository } from '@/data/test'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadSurveys,
  loadSurveysRepository: LoadSurveysRepository
}

const makeSut = ():SutTypes => {
  const loadSurveysRepository = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepository)

  return {
    sut, loadSurveysRepository
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.set(new Date())
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    const accountId = faker.random.alphaNumeric()
    await sut.load(accountId)
    expect(loadAllSpy).toHaveBeenCalledWith(accountId)
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const accountId = faker.random.alphaNumeric()
    const surveys = await sut.load(accountId)
    expect(surveys).toEqual(mockSurveysModel())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    jest.spyOn(loadSurveysRepository, 'loadAll').mockImplementationOnce(throwError)
    const accountId = faker.random.alphaNumeric()
    const promise = sut.load(accountId)
    await expect(promise).rejects.toThrow()
  })
})
