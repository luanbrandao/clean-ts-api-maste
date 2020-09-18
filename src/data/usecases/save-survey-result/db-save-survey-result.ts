import { SaveSurveyResultRepository, SaveSurveyResultModel, SaveSurveyResult, SurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return {
      id: 'valid_id',
      accountId: 'any_account_id',
      surveyId: 'any_survey_id',
      answer: 'any_answer',
      date: new Date()
    }
  }
}
