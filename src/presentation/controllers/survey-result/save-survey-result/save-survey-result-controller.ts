import { Controller, HttpRequest, HttpResponse, LoadSurveysById, SaveSurveyResult } from './save-survey-result-controller-protocols'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveysById: LoadSurveysById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest:HttpRequest): Promise<HttpResponse> {
    try {
      const surveyId = httpRequest.params.surveyId
      const { answer } = httpRequest.body
      const { accountId } = httpRequest

      const survey = await this.loadSurveysById.loadById(surveyId)

      if (survey) {
        const answers = survey.answers.map(a => a.answer)

        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      await this.saveSurveyResult.save({
        accountId: accountId as string,
        surveyId,
        answer,
        date: new Date()
      })

      return {
        statusCode: 0,
        body: null
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
