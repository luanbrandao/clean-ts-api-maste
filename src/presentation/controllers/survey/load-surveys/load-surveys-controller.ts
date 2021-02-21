import { HttpRequest, HttpResponse, Controller, LoadSurveys } from './load-survey-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys:LoadSurveys
  ) {}

  async handle (_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
