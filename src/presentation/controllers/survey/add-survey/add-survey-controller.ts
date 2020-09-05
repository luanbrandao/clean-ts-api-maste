import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'

export class AddServeryController implements Controller {
  constructor (
    private readonly validation:Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve({
      statusCode: 0,
      body: ''
    }))
  }
}
