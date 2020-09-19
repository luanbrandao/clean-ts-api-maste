import { Controller, HttpRequest, HttpResponse, LoadSurveysById } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveysById: LoadSurveysById
  ) {}

  async handle (httpRequest:HttpRequest): Promise<HttpResponse> {
    await this.loadSurveysById.loadById(httpRequest.params.surveyId)
    return {
      statusCode: 0,
      body: null
    }
  }
}
