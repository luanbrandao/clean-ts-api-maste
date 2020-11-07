import { LoadSurveyResultRepository, SurveyResultModel, LoadSurveyResult } from './db-load-survey-result-protocols'
export class DBLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {

  }

  async load (surveyId: string): Promise<SurveyResultModel | null> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return surveyResult
  }
}
