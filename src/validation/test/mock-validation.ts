import { Validation } from '@/presentation/protocols'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (_input:any):Error | null{
      // return new MissingParamError('field')
      return null
    }
  }

  return new ValidationStub()
}
