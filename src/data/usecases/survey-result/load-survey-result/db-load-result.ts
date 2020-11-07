import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'

export class DBLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {

  }

  async load (surveyId: string): Promise<SurveyResultModel | null> {
    await this.loadSurveyResultRepository.loadBySurverId(surveyId)
    return null
  }
}
