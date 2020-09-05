/* eslint-disable no-undef */
import { LoginController } from './login-controller'
import { badRequest, serverError, unauthorized, ok } from '../../../helpers/http/http-helper'
import { MissingParamError } from '../../../errors'
import { HttpRequest, Authentication, Validation } from './login-controller-protocols'
import { AuthenticationModel } from '../../../../domain/usecases/authentication'

// const makeEmailValidator = (): EmailValidator => {
//   class EmailValidatorStub implements EmailValidator {
//     isValid (_email: string):boolean {
//       return true
//     }
//   }

//   return new EmailValidatorStub()
// }

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (_authentication: AuthenticationModel):Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (_input : any):Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = ():HttpRequest => ({
  body: {
    email: 'any_email@gmail.com',
    password: 'any_password'
  }
})

interface SutTypes {
  sut: LoginController
  authenticationStub:Authentication,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()

  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('Login COntroller', () => {
//   test('Should return 400 if no email is provider', async () => {
//     const { sut } = makeSut()
//     const httpRequest = {
//       body: {
//         password: 'any_password'
//       }
//     }

  //     const httpResponse = await sut.handle(httpRequest)

  //     expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  //   })

  //   test('Should return 400 if no password is provider', async () => {
  //     const { sut } = makeSut()
  //     const httpRequest = {
  //       body: {
  //         email: 'any_email@gmail.com'
  //       }
  //     }

  //     const httpResponse = await sut.handle(httpRequest)

  //     expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  //   })

  //   test('Should return 400 if an invalid email is provided', async () => {
  //     const { sut, emailValidatorStub } = makeSut()

  //     jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

  //     const httpRequest = makeFakeRequest()

  //     const httpResponse = await sut.handle(httpRequest)

  //     expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  //   })

  // test('Should call EmailValidator with correct email', async () => {
  //   const { sut, emailValidatorStub } = makeSut()

  //   const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

  //   const httpRequest = makeFakeRequest()

  //   await sut.handle(httpRequest)

  //   expect(isValidSpy).toHaveBeenLastCalledWith('any_email@gmail.com')
  // })

  // test('Should return 500 if EmailValidator throws', async () => {
  //   const { sut, emailValidatorStub } = makeSut()

  //   jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
  //     throw new Error()
  //   })

  //   const httpResponse = await sut.handle(makeFakeRequest())

  //   expect(httpResponse).toEqual(serverError(new Error()))
  // })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(authSpy).toHaveBeenLastCalledWith({
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve()))

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validatSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(validatSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
