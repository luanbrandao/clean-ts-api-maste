export interface AddSurveyModel {
  question: string;
  answers: SurveyAnswer[];
  date: Date;
}
export interface SurveyAnswer {
  image?: string;
  answer: string;
}

// AccountModel: entidade do banco de dados
export interface AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
