import { HttpRequest, HttpResponse } from '../protocols/http'
// erros
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'

import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { ServerError } from '../errors/server-error'

export class SignUpController implements Controller {
  // private readonly emailValidator:EmailValidator;

  constructor (private readonly emailValidator: EmailValidator) {
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

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return badRequest(new MissingParamError('Error server'))
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      } as HttpResponse
    }
  }
}
