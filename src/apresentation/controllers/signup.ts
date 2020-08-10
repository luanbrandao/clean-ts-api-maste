import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      } as HttpResponse
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      } as HttpResponse
    }

    return {
      statusCode: 500,
      body: new Error('Error server')
    } as HttpResponse
  }
}
