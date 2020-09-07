import { Middleware, HttpRequest, HttpResponse } from '../protocols'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'

export class AuthMiddleware implements Middleware {
  async handle (_httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(forbidden(new AccessDeniedError())))
  }
}
