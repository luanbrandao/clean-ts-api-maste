import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { EmailValidator } from '../signup/signup-protocols'
import { Authentication } from '../../../domain/usecases/authentication'

export class LoginController implements Controller {
  private readonly emailValidaro:EmailValidator;
  private readonly authentication:Authentication;

  constructor (emailValidaro:EmailValidator, authentication:Authentication) {
    this.emailValidaro = emailValidaro
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidaro.isValid(email)

      if (!isValid) {
        return (badRequest(new InvalidParamError('email')))
      }

      await this.authentication.auth(email, password)

      return (ok(''))
    } catch (error) {
      return serverError(error)
    }
  }
}
