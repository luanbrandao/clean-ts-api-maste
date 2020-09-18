import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '../load-surveys/add-survey-repository-protocols'
import { LoadSurveysById } from '@/domain/usecases/load-surveys-by-id'

export class DbLoadSurveyById implements LoadSurveysById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    await this.loadSurveyByIdRepository.loadById(id)
    return {
      id: 'string',
      question: 'string',
      answers: [],
      date: new Date()
    }
  }
}
