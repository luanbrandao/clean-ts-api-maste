/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

import { SignUpController } from './signup'
import { MissingParamError, ServerError } from '../../errors'

import {
  AddAccountModel,
  AddAccount,
  AccountModel,
  Validation
} from './signup-protocols'
import { HttpRequest } from '../../protocols'
import { ok, serverError, badRequest } from '../../helpers/http-helper'

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      // const fakeAccount = {
      //   id: 'valid_id',
      //   name: 'valid_name',
      //   email: 'valid_email@mail.com',
      //   password: 'valid_password'
      // }
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  // const emailValidatorStub:EmailValidator = new EmailValidatorStub()
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (_input : any):Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeAccount = () : AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
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

interface SutType {
  sut: SignUpController,
  // emailValidatorStub: EmailValidator,
  addAccountStub: AddAccount,
  validationStub: Validation
}

const makeSut = (): SutType => {
  // const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccountStub()
  const validationStub = makeValidation()

  const sut = new SignUpController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}
describe('SignUp Controller', () => {
  // test('Should return 400 if no name is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       // name: 'any_name',
  //       email: 'any_email@mail.com',
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
  //       // email: 'any_email@mail.com',
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
  //       email: 'any_email@mail.com',
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
  //       email: 'any_email@mail.com',
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
  //       email: 'any_email@mail.com',
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

  //   // espina o método
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
  //   const httpResponse = await sut.handle(makeFakeRequest())
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
  //       email: 'any_email@mail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }

  //   await sut.handle(httpRequest)
  //   expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  // })

  // // teste de integração de components
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
  //       email: 'any_email@mail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }

  //   const httpResponse = await sut.handle(httpRequest)
  //   // expect(httpResponse.statusCode).toBe(500)
  //   // expect(httpResponse.body).toEqual(new ServerError())
  //   expect(httpResponse).toEqual(serverError(new ServerError()))
  // })

  // teste de integração de components
  test('Should return 500 if AddAccount throws', async () => {
    // const emailValidatorStub = makeEmailValidatorWithError()
    // const sut = new SignUpController(emailValidatorStub)

    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockImplementation(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    // expect(httpResponse.statusCode).toBe(500)
    // expect(httpResponse.body).toEqual(new ServerError())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  // testa a integração do SignUpController com AddAcount
  test('Should call AddAcount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()

    // captura o retorno
    const addSpy = jest.spyOn(addAccountStub, 'add')

    // const httpRequest = {
    //   body: {
    //     name: 'any_name',
    //     email: 'any_email@mail.com',
    //     password: 'any_password',
    //     passwordConfirmation: 'any_password'
    //   }
    // }

    // await sut.handle(httpRequest)
    await sut.handle(makeFakeRequest())

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 200 if valid data if provided', async () => {
    // como os mocks sempre retornam o melhor caso, nos testes que passam (200)
    // não precisa usar os mocks
    const { sut } = makeSut()

    // espina o método

    // const httpRequest = {
    //   body: {
    //     name: 'valid_name',
    //     email: 'valid_email@mail.com',
    //     password: 'valid_password',
    //     passwordConfirmation: 'valid_password'
    //   }
    // }

    // const httpResponse = await sut.handle(httpRequest)
    const httpResponse = await sut.handle(makeFakeRequest())

    // expect(httpResponse.body).toEqual({
    //   id: 'valid_id',
    //   name: 'valid_name',
    //   email: 'valid_email@mail.com',
    //   password: 'valid_password'
    // })

    // expect(httpResponse.body).toEqual(makeFakeAccount())
    // expect(httpResponse.statusCode).toBe(200)

    expect(httpResponse).toEqual(ok(makeFakeAccount()))
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
