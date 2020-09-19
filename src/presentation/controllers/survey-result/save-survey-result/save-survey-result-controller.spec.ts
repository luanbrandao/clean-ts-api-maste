import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest, LoadSurveysById, SurveyModel } from './save-survey-result-controller-protocols'

const makeFakeRequest = ():HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeLoadSurveyById = ():LoadSurveysById => {
  class LoadSurveysByIdStub implements LoadSurveysById {
    loadById (_id: string): Promise<SurveyModel> {
      return Promise.resolve(makeFakeSurvey())
    }
  }
  return new LoadSurveysByIdStub()
}

type SutTypes = {
  sut: SaveSurveyResultController,
  loadSurveyByIdStub: LoadSurveysById
}

const makeSut = () : SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)

  return {
    sut, loadSurveyByIdStub
  }
}

describe('SaveSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
