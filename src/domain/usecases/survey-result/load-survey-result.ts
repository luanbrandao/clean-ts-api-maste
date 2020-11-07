import { SurveyResultModel } from '../../models/survey-result'

export interface LoadSurveyResult {
  load (surveyId: string): Promise<SurveyResultModel | null>
}
