import { LoadSurveyResultRepository, SurveyResultModel, LoadSurveyResult, LoadSurveyByIdRepository } from './db-load-survey-result-protocols'
export class DBLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel | null> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = {
        surveyId: survey?.id as string,
        question: survey?.question as string,
        answers: survey?.answers.map(answer => Object.assign({}, answer, {
          count: 0,
          percent: 0
        })) as any
      } as SurveyResultModel
    }
    return surveyResult
  }
}
