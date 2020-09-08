import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
// import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
// import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
// import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
// import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
// import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../../../presentation/protocols'
// import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
// import env from '../../../config/env'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

// FACTORY

// export const makeSignUpCOntroller = (): SignUpController => {
export const makeSignUpCOntroller = (): Controller => {
  // const salt = 12

  // const emailValidatorAdapter = new EmailValidatorAdapter()

  // const bcryptAdapter = new BcryptAdapter(salt)
  // const accountMongoRepository = new AccountMongoRepository()
  // const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  // const signUpController =
  return makeLogControllerDecorator(new SignUpController(
    //  emailValidatorAdapter,
    //  dbAddAccount,
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  ))

  // return signUpController
  // move to decorators
  // const logMongoRepository = new LogMongoRepository()
  // return new LogControllerDecorator(signUpController, logMongoRepository)
}
