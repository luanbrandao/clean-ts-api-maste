import { Controller, HttpRequest, HttpResponse, LoadSurveysById } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
        private readonly loadSurveybyId: LoadSurveysById
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveybyId.loadById(httpRequest.params.surveyId)
    return Promise.resolve({
      statusCode: 1,
      body: ''
    })
  }
}
