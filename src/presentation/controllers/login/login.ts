import { Controller, HttpResponse, HttpRequest, Validation, Authentication } from './login-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'

export class LoginController implements Controller {
  // private readonly emailValidaro:EmailValidator;
  private readonly authentication:Authentication;
  private readonly validation:Validation

  constructor (
    // emailValidaro:EmailValidator,
    authentication:Authentication,
    validation:Validation
  ) {
    // this.emailValidaro = emailValidaro
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      // const requiredFields = ['email', 'password']

      // for (const field of requiredFields) {
      //   if (!httpRequest.body[field]) {
      //     return badRequest(new MissingParamError(field))
      //   }
      // }

      const { email, password } = httpRequest.body

      // const isValid = this.emailValidaro.isValid(email)

      // if (!isValid) {
      //   return (badRequest(new InvalidParamError('email')))
      // }

      const accessToken = await this.authentication.auth({ email, password })

      if (!accessToken) {
        return unauthorized()
      }

      return (ok({ accessToken: accessToken }))
    } catch (error) {
      return serverError(error)
    }
  }
}
