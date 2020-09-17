import { SurveyModel } from '../models/survey'

// export type AddSurveyModel = {
//   question: string;
//   answers: SurveyAnswerModel[];
//   date: Date;
// }
export type AddSurveyModel = Omit<SurveyModel, 'id'>

// AccountModel: entidade do banco de dados
export interface AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
