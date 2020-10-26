import { loginPath, surveypath, signUpPath, surveyResultPath } from './paths'
import { badRequest, serverError, anauthorized, notFound, forbidden } from './components'
import { accountSchema, loginParamsSchema, errorSchema, surveySchema, surveyAnswerSchema, apiKeyAuthSchema, signUpParamsSchema, addSurveyParamsSchema, saveSurveyParamsSchema, surveyResultSchema } from './schemas'
import { surveysSchema } from './schemas/surveys-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'Doc do curso NodeJs usando Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns',
    version: '1.0.0',
    contact: {
      name: 'luanbrandao',
      email: 'luanbrandao4@gmail.com',
      url: 'https://www.linkedin.com/in/lb4/'
    }
  },
  license: {
    name: '',
    url: ''
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [
    { name: 'Login' },
    { name: 'Enquete' }
  ],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveypath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
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
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    anauthorized,
    notFound,
    forbidden
  }
}
