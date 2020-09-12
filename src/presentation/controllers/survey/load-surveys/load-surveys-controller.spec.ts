import { LoadSurveysController } from './load-surveys-controller'
import { SurveyModel, LoadSurveys } from './load-survey-controller-protocols'
import Mockdate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }, {
    id: 'other_id',
    question: 'other',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

interface SutTypes {
  sut: LoadSurveysController,
  loadSurveysStub:LoadSurveys
}

const makeLoadSurveys = () : LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load ():Promise<SurveyModel[]|null> {
      return Promise.resolve(makeFakeSurveys())
    }
  }

  return new LoadSurveysStub()
}

const makeSut = () : SutTypes => {
  const loadSurveysStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)

  return {
    sut, loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.set(new Date())
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
