import { Controller, HttpRequest, HttpResponse, LoadSurveysById } from './save-survey-result-controller-protocols'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveysById: LoadSurveysById
  ) {}

  async handle (httpRequest:HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveysById.loadById(httpRequest.params.surveyId)

    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }

    return {
      statusCode: 0,
      body: null
    }
  }
}
