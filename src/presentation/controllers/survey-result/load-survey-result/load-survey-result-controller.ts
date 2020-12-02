import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveysById } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
        private readonly loadSurveybyId: LoadSurveysById
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveybyId.loadById(httpRequest.params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return Promise.resolve({
        statusCode: 1,
        body: ''
      })
    } catch (error) {
      return serverError(new Error())
    }
  }
}
