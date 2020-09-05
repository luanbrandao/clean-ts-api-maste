
// erros
// import { InvalidParamError } from '../../errors'
import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/http-helper'

import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  // EmailValidator,
  Validation
} from './signup-controller-protocols'
import { Authentication } from '../login/login-controller-protocols'
import { EmailInUseError } from '../../../errors'

export class SignUpController implements Controller {
  // private readonly emailValidator:EmailValidator;
  constructor (
    // private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation:Validation,
    private readonly authentication:Authentication
  ) {
    // this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      // const requiredFields = ['name', 'password', 'passwordConfirmation', 'email']
      // for (const field of requiredFields) {
      //   if (!httpRequest.body[field]) {
      //     return badRequest(new MissingParamError(field))
      //   }
      // }

      const { name, email, password } = httpRequest.body

      // if (password !== passwordConfirmation) {
      //   return badRequest(new InvalidParamError('passwordConfirmation'))
      // }

      // const isValid = this.emailValidator.isValid(email)

      // if (!isValid) {
      //   return badRequest(new InvalidParamError('email'))
      // }

      // tudo ok, agora cria a conta
      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ accessToken })
    } catch (error) {
      // console.error(error)
      return serverError(error)
    }
  }
}
