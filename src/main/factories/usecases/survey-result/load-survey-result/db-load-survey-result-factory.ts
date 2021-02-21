import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { DBLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-result'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DBLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
