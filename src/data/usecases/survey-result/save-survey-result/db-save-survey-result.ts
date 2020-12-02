import { LoadSurveyResultRepository } from '../load-survey-result/db-load-survey-result-protocols'
import { SaveSurveyResultRepository, SaveSurveyResultParams, SaveSurveyResult, SurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) { }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
    // const surveyResult = await this.saveSurveyResultRepository.save(data)
    // return surveyResult
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
    return surveyResult
  }
}
