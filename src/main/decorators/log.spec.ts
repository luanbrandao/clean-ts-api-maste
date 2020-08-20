/* eslint-disable no-undef */

import { LogControllerDecorator } from './log'
import { Controller, HttpResponse, HttpRequest } from '../../presentation/protocols'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    handle (_httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Luan'
        }
      }

      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecorator,
  controllerStub:Controller
}

const makeSut = () : SutTypes => {
  // const controllerStub = new ControllerStub()
  const controllerStub = makeController()

  const sut = new LogControllerDecorator(controllerStub)

  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  // não pode alterar o comportamento que já tinha
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        email: 'any_mail@gmail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same of the controller', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_mail@gmail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Luan'
      }
    })
  })
})
