import { SurveyAnswerModel } from '../models/survey'

export interface AddSurveyModel {
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
}

// AccountModel: entidade do banco de dados
export interface AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
