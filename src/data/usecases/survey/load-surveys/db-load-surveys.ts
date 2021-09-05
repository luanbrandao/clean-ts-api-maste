import { LoadSurveysRepository, SurveyModel, LoadSurveys } from './add-survey-repository-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository : LoadSurveysRepository

  ) {}

  async load (accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
