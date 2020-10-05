import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '../load-surveys/add-survey-repository-protocols'
import { LoadSurveysById } from '@/domain/usecases/survey/load-surveys-by-id'

export class DbLoadSurveyById implements LoadSurveysById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
