import { loginPath, surveypath, signUpPath, surveyResultPath } from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/surveys': surveypath,
  '/surveys/{surveyId}/results': surveyResultPath
}
