import { mockSurveyResultModel } from '@/domain/test'
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'
import { DBLoadSurveyResult } from './db-load-result'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResulutRepository', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurverId (_surveyId: string): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel())
      }
    }

    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const sut = new DBLoadSurveyResult(loadSurveyResultRepositoryStub)
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurverId')
    await sut.load('any_survey_id')

    expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
