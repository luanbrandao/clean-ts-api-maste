import { HttpRequest } from './add-survey-controller-protocols'
import { AddServeryController } from './add-survey-controller'
import { Validation } from '../../../protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

const makeValidation = () : Validation => {
  class ValidationStub implements Validation {
    validate (_input: any) : Error |null{
      return null
    }
  }

  return new ValidationStub()
}
interface SutTypes {
  sut: AddServeryController,
  validationStub: Validation
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddServeryController(validationStub)

  return {
    sut, validationStub
  }
}

describe.only('AddSurvery Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
