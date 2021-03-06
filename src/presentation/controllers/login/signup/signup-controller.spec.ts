/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

import { SignUpController } from './signup-controller'
import { MissingParamError, ServerError, EmailInUseError } from '@/presentation/errors'

import {
  AddAccount,
  Validation
} from './signup-controller-protocols'
import { HttpRequest } from '@/presentation/protocols'
import { ok, serverError, badRequest, forbidden } from '@/presentation/helpers/http/http-helper'
import { Authentication } from '../login/login-controller-protocols'
import { throwError } from '@/domain/test'
import { mockValidation, mockAuthentication, mockAddAccount } from '@/presentation/test'

const mockRequesst = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

// usou o mockImplementation no lugar
// const makeEmailValidatorWithError = (): EmailValidator => {
//   class EmailValidatorStub implements EmailValidator {
//     isValid (email: string):boolean {
//       throw new Error()
//     }
//   }

//   return new EmailValidatorStub()
// }

type SutTypes = {
  sut: SignUpController,
  // emailValidatorStub: EmailValidator,
  addAccountStub: AddAccount,
  validationStub: Validation,
  authenticationStub: Authentication,
}

const makeSut = (): SutTypes => {
  // const emailValidatorStub = makeEmailValidator()
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()

  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}
describe('SignUp Controller', () => {
  // test('Should return 400 if no name is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       // name: 'any_name',
  //       email: 'any_email@gmail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }

  //   const httpResponse = await sut.handle(httpRequest)
  //   // expect(httpResponse.statusCode).toBe(400)
  //   // expect(httpResponse.body).toEqual(new MissingParamError('name'))
  //   expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  // })

  // test('Should return 400 if no email is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       // email: 'any_email@gmail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }

  //   const httpResponse = await sut.handle(httpRequest)
  //   // expect(httpResponse.statusCode).toBe(400)
  //   // expect(httpResponse.body).toEqual(new MissingParamError('email'))
  //   expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  // })

  // test('Should return 400 if no password is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_email@gmail.com',
  //       // password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }

  //   const httpResponse = await sut.handle(httpRequest)
  //   // expect(httpResponse.statusCode).toBe(400)
  //   // expect(httpResponse.body).toEqual(new MissingParamError('password'))
  //   expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  // })

  // test('Should return 400 if no password confirmation is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_email@gmail.com',
  //       password: 'any_password'
  //       // passwordConfirmation: 'any_password'
  //     }
  //   }

  //   const httpResponse = await sut.handle(httpRequest)
  //   // expect(httpResponse.statusCode).toBe(400)
  //   // expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  //   expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  // })

  // test('Should return 400 if password confirmation fails', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_email@gmail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'invalid_password'
  //     }
  //   }

  //   const httpResponse = await sut.handle(httpRequest)
  //   // expect(httpResponse.statusCode).toBe(400)
  //   // expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  //   expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
  // })

  // test('Should return 400 if invalid email if provided', async () => {
  //   const { sut, emailValidatorStub } = makeSut()

  //   // espina o m??todo
  //   jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

  //   // const httpRequest = {
  //   //   body: {
  //   //     name: 'any_name',
  //   //     email: 'invalid_email@mail.com',
  //   //     password: 'any_password',
  //   //     passwordConfirmation: 'any_password'
  //   //   }
  //   // }

  //   // const httpResponse = await sut.handle(httpRequest)
  //   const httpResponse = await sut.handle(mockRequesst())
  //   // expect(httpResponse.statusCode).toBe(400)
  //   // expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  //   expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  // })

  // test('Should call EmailValidator with correct email', async () => {
  //   const { sut, emailValidatorStub } = makeSut()

  //   // captura o retorno
  //   const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_email@gmail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }

  //   await sut.handle(httpRequest)
  //   expect(isValidSpy).toHaveBeenCalledWith('any_email@gmail.com')
  // })

  // // teste de integra????o de components
  // test('Should return 500 if EmailValidator throws', async () => {
  //   // const emailValidatorStub = makeEmailValidatorWithError()
  //   // const sut = new SignUpController(emailValidatorStub)

  //   const { sut, emailValidatorStub } = makeSut()

  //   jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(():any => {
  //     throw new Error()
  //   })

  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_email@gmail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }

  //   const httpResponse = await sut.handle(httpRequest)
  //   // expect(httpResponse.statusCode).toBe(500)
  //   // expect(httpResponse.body).toEqual(new ServerError())
  //   expect(httpResponse).toEqual(serverError(new ServerError()))
  // })

  // teste de integra????o de components
  test('Should return 500 if AddAccount throws', async () => {
    // const emailValidatorStub = makeEmailValidatorWithError()
    // const sut = new SignUpController(emailValidatorStub)

    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockImplementation(async () => {
      return Promise.reject(new Error())
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    // expect(httpResponse.statusCode).toBe(500)
    // expect(httpResponse.body).toEqual(new ServerError())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  // testa a integra????o do SignUpController com AddAcount
  test('Should call AddAcount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()

    // captura o retorno
    const addSpy = jest.spyOn(addAccountStub, 'add')

    // const httpRequest = {
    //   body: {
    //     name: 'any_name',
    //     email: 'any_email@gmail.com',
    //     password: 'any_password',
    //     passwordConfirmation: 'any_password'
    //   }
    // }

    // await sut.handle(httpRequest)
    await sut.handle(mockRequesst())

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequesst())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data if provided', async () => {
    // como os mocks sempre retornam o melhor caso, nos testes que passam (200)
    // n??o precisa usar os mocks
    const { sut } = makeSut()

    // espina o m??todo

    // const httpRequest = {
    //   body: {
    //     name: 'valid_name',
    //     email: 'valid_email@mail.com',
    //     password: 'valid_password',
    //     passwordConfirmation: 'valid_password'
    //   }
    // }

    // const httpResponse = await sut.handle(httpRequest)
    const httpResponse = await sut.handle(mockRequesst())

    // expect(httpResponse.body).toEqual({
    //   id: 'valid_id',
    //   name: 'valid_name',
    //   email: 'valid_email@mail.com',
    //   password: 'valid_password'
    // })

    // expect(httpResponse.body).toEqual(mockAccountModel())
    // expect(httpResponse.statusCode).toBe(200)

    // expect(httpResponse).toEqual(ok(mockAccountModel()))
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validatSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequesst()
    await sut.handle(httpRequest)

    expect(validatSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(mockRequesst())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = mockRequesst()
    await sut.handle(httpRequest)

    expect(authSpy).toHaveBeenLastCalledWith({
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequesst())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
