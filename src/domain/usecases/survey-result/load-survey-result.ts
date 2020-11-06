import { SurveyResultModel } from '../../models/survey-result'

export interface LoadSurveyResult {
  save (surveyId: string): Promise<SurveyResultModel>
}
