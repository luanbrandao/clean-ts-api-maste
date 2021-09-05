import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, HttpRequest } from './load-survey-controller-protocols'
import Mockdate from 'mockdate'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { throwError, mockSurveysModel } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test'

import faker from 'faker'

const mockRequest = (): HttpRequest => ({ accountId: faker.random.alphaNumeric() })

type SutTypes = {
  sut: LoadSurveysController,
  loadSurveysStub:LoadSurveys
}

const makeSut = () : SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)

  return {
    sut, loadSurveysStub
  }
}

describe('LoadSurveys Controller with correct value', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.set(new Date())
  })

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load')

    const httpResponse = mockRequest()

    await sut.handle(httpResponse)
    expect(loadSurveysStub.load).toHaveBeenCalledWith(httpResponse.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveysModel()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
