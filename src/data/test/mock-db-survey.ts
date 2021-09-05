import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel, LoadSurveysRepository } from '@/data/usecases/survey/load-surveys/add-survey-repository-protocols'
import { mockSurveyModel, mockSurveysModel } from '@/domain/test'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (_surveyData: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = ():LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (_id:string):Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = ():LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
     accountId = ''
     async loadAll (accountId: string):Promise<SurveyModel[]> {
       this.accountId = accountId
       return Promise.resolve(mockSurveysModel())
     }
  }

  return new LoadSurveysRepositoryStub()
}
