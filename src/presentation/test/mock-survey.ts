import { AddSurvey, AddSurveyParams } from '@/presentation/controllers/survey/add-survey/add-survey-controller-protocols'
import { LoadSurveys, SurveyModel } from '../controllers/survey/load-surveys/load-survey-controller-protocols'
import { mockSurveysModel, mockSurveyModel } from '@/domain/test'
import { LoadSurveysById } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'

export const mockAddSurvey = () : AddSurvey => {
  class AddSurveyStub implements AddSurveyStub {
    async add (_data: AddSurveyParams) : Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddSurveyStub()
}

export const mockLoadSurveys = () : LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (_accountId: string):Promise<SurveyModel[]|null> {
      return Promise.resolve(mockSurveysModel())
    }
  }
  return new LoadSurveysStub()
}

export class LoadSurveysSpy implements LoadSurveys {
  accountId: string = ''
  result = mockSurveysModel()

  async load (accountId: string): Promise<SurveyModel[]|null> {
    this.accountId = accountId
    console.log('this.accountId', this.accountId)
    return this.result
  }
}

export const mockLoadSurveyById = ():LoadSurveysById => {
  class LoadSurveysByIdStub implements LoadSurveysById {
    async loadById (_id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveysByIdStub()
}
