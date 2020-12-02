import { mockLoadSurveyById } from '@/presentation/test'
import { HttpRequest, LoadSurveysById } from './load-survey-result-controller-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

type SutTypes = {
    sut: LoadSurveyResultController,
    loadSurveybyIdStub: LoadSurveysById
}

const makeSut = (): SutTypes => {
  const loadSurveybyIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveybyIdStub)
  return {
    loadSurveybyIdStub,
    sut
  }
}
describe('LoadSurveyResult Controller', () => {
  test('Should all LoadSurveyById with correct value', async () => {
    const { sut, loadSurveybyIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveybyIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenLastCalledWith('any_id')
  })
})
