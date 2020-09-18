import { SurveyModel } from '../models/survey'

export interface LoadSurveysById
 {
  load (id: string): Promise<SurveyModel|null>
}
