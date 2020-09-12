import { HttpRequest, HttpResponse, Controller, LoadSurveys } from './load-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys:LoadSurveys
  ) {}

  async handle (_httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()

    return {
      statusCode: 0,
      body: ''
    }
  }
}
