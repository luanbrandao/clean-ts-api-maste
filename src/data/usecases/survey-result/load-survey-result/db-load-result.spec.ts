import { mockSurveyResultModel } from '@/domain/test'
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'
import { DBLoadSurveyResult } from './db-load-result'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

type SutTypes = {
  sut: DBLoadSurveyResult,
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurverId (_surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new LoadSurveyResultRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DBLoadSurveyResult(loadSurveyResultRepositoryStub)
  return {
    sut,
    loadSurveyResultRepositoryStub
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResulutRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurverId')
    await sut.load('any_survey_id')

    expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
