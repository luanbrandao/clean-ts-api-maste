import { accountSchema, loginParamsSchema, errorSchema, surveySchema, surveyAnswerSchema, signUpParamsSchema, addSurveyParamsSchema, saveSurveyParamsSchema, surveyResultSchema, surveysSchema } from './schemas/'

export default {
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    singUpParams: signUpParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema,
    surveyResultAnswer: surveyResultSchema
  }
}
