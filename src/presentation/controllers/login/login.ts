import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { badRequest, ok } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidaro:EmailValidator;

  constructor (emailValidaro:EmailValidator) {
    this.emailValidaro = emailValidaro
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }

    const isValid = this.emailValidaro.isValid(httpRequest.body.email)

    if (!isValid) {
      return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
    }

    return new Promise(resolve => resolve(ok('')))
  }
}
