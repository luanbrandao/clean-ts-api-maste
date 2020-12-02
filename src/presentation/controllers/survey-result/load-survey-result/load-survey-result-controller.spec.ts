import { mockLoadSurveyById, mockLoadSurveyResult } from '@/presentation/test'
import { HttpRequest, LoadSurveysById, LoadSurveyResult } from './load-survey-result-controller-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { throwError } from '@/domain/test'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

type SutTypes = {
    sut: LoadSurveyResultController,
    loadSurveybyIdStub: LoadSurveysById
    loadSurveyResultStub: LoadSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveybyIdStub = mockLoadSurveyById()
  const loadSurveyResultStub = mockLoadSurveyResult()
  const sut = new LoadSurveyResultController(loadSurveybyIdStub, loadSurveyResultStub)
  return {
    loadSurveybyIdStub,
    sut,
    loadSurveyResultStub
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
  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveybyIdStub } = makeSut()
    jest.spyOn(loadSurveybyIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenLastCalledWith('any_id')
  })
})
