import { mockLoadSurveyById } from '@/presentation/test'
import { HttpRequest, LoadSurveysById } from './load-survey-result-controller-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

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
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveybyIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveybyIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenLastCalledWith('any_id')
  })
  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveybyIdStub } = makeSut()
    jest.spyOn(loadSurveybyIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
})
