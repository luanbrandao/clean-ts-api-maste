import { LoadSurveysRepository } from '../../protocols/db/survey/load-survey-repository'
import { SurveyModel } from '../../../domain/models/survey'
import { DbLoadSurveys } from './db-load-surveys'

interface SutTypes {
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
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
