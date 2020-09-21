/* eslint-disable no-undef */

import { LogControllerDecorator } from './log-controller-decorator'
import { Controller, HttpResponse, HttpRequest } from '@/presentation/protocols'
import { serverError, ok } from '@/presentation/helpers/http/http-helper'
import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { mockAccountModel } from '@/domain/test'
import { mockLogErrorRepository } from '@/data/test'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    handle (_httpRequest: HttpRequest): Promise<HttpResponse> {
      // const httpResponse: HttpResponse = {
      //   statusCode: 200,
      //   body: {
      //     name: 'Luan'
      //   }
      // }
      // return new Promise(resolve => resolve(httpResponse))
      return new Promise(resolve => resolve(ok(mockAccountModel())))
    }
  }
  return new ControllerStub()
}

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

type SutTypes = {
  sut: LogControllerDecorator,
  controllerStub:Controller
  logErrorRepositoryStub: LogErrorRepository
  /** ia colocar a interface LogErrorRepository no main
      mas como o infra ia implemetar ela, o infra ia apontar pro main é isso é errado.
      opção 1: não utilizar uma interface e dentro do decorator colocar uma classe concreta,
      o problema é que se mudar o banco ia ter que alterar o decorator tbm.
      opção 2: colocar o protocolor dentro do data onde geralmente o infra consome.
      escolhemos a opção 2.
  */
}

const makeSut = () : SutTypes => {
  // const controllerStub = new ControllerStub()
  const controllerStub = makeController()
  const logErrorRepositoryStub = mockLogErrorRepository()

  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogController Decorator', () => {
  // não pode alterar o comportamento que já tinha
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())

    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return the same of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    // expect(httpResponse).toEqual({
    //   statusCode: 200,
    //   body: {
    //     name: 'Luan'
    //   }
    // })
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    // const error = serverError(new Error())

    // const fakeError = new Error()
    // fakeError.stack = 'any_stack'
    // const error = serverError(fakeError)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))
    await sut.handle(makeFakeRequest())

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
