import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResultRepository {
  loadBySurverId (surveyId: string): Promise<SurveyResultModel>
}
