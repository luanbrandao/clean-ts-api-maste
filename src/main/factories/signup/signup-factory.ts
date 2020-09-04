import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
// import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

import { makeSignUpValidation } from './signup-validation-factory'

// FACTORY

// export const makeSignUpCOntroller = (): SignUpController => {
export const makeSignUpCOntroller = (): Controller => {
  const salt = 12

  // const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const signUpController =
     new SignUpController(
       //  emailValidatorAdapter,
       dbAddAccount,
       makeSignUpValidation()
     )

  const logMongoRepository = new LogMongoRepository()
  // return signUpController

  return new LogControllerDecorator(signUpController, logMongoRepository)
}