import { EmailValidator } from '../apresentation/protocols/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email:string):boolean {
    return !(email)
  }
}
