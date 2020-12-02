import { mockLoadSurveyById } from '@/presentation/test'
import { HttpRequest } from '../../login/login/login-controller-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

describe('LoadSurveyResult Controller', () => {
  test('Should all LoadSurveyById with correct value', async () => {
    const loadSurveybyIdStub = mockLoadSurveyById()
    const sut = new LoadSurveyResultController(loadSurveybyIdStub)
    const loadByIdSpy = jest.spyOn(loadSurveybyIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenLastCalledWith('any_id')
  })
})
