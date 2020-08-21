import { Controller, HttpResponse, HttpRequest, EmailValidator, Authentication } from './login-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'

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

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }

      return (ok(''))
    } catch (error) {
      return serverError(error)
    }
  }
}
