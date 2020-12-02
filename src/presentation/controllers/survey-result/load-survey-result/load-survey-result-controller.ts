import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveysById } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
        private readonly loadSurveybyId: LoadSurveysById,
        private readonly loadSurveyResul: LoadSurveyResult
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveybyId.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      await this.loadSurveyResul.load(surveyId)

      return Promise.resolve({
        statusCode: 1,
        body: ''
      })
    } catch (error) {
      return serverError(new Error())
    }
  }
}
