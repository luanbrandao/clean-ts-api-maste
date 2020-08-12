
// erros
import { MissingParamError, InvalidParamError } from '../errors'

import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { AddAccount } from '../../domain/usecases/add-account'

export class SignUpController implements Controller {
  // private readonly emailValidator:EmailValidator;

  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'password', 'passwordConfirmation', 'email']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      // tudo ok, agora cria a conta
      this.addAccount.add({
        name,
        email,
        password
      })

      return badRequest(new MissingParamError('Error server'))
    } catch (error) {
      return serverError()
    }
  }
}
