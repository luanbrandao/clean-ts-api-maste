import { LoadSurveysRepository, SurveyModel } from './add-survey-repository-protocols'

import Mockdate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'

type SutTypes = {
  sut: DbLoadSurveys,
  loadSurveysRepository: LoadSurveysRepository
}
const makeLoadSurveysRepository = ():LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll ():Promise<SurveyModel[]> {
      return Promise.resolve(makeFakeSurveys())
    }
  }

  return new LoadSurveysRepositoryStub()
}
const makeSut = ():SutTypes => {
  const loadSurveysRepository = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepository)

  return {
    sut, loadSurveysRepository
  }
}

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }, {
    id: 'other_id',
    question: 'other',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
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
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeSurveys())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    jest.spyOn(loadSurveysRepository, 'loadAll').mockResolvedValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})