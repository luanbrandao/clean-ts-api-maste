import { SurveyModel } from '../../models/survey'

// export type AddSurveyParams = {
//   question: string;
//   answers: SurveyAnswerModel[];
//   date: Date;
// }
export type AddSurveyParams = Omit<SurveyModel, 'id'>

// AccountModel: entidade do banco de dados
export interface AddSurvey {
  add (data: AddSurveyParams): Promise<void>
}
