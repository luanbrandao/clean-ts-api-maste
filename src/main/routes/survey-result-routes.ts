import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '../middlewares/auth'
import { Router } from 'express'
import { makeLoadSurveyResultController } from '../factories/controllers/survey-result/load-survey-result copy/load-survey-result-controller-factory'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'

export default (router:Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
