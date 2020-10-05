// import env from '../../../config/env'
// import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '@/presentation/protocols'
// import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'
// import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
// import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
// import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
// import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  // const salt = 12
  // const bcryptAdapter = new BcryptAdapter(salt)
  // const jwtAdapter = new JwtAdapter(env.jwtSecret)
  // const accountMongoRepository = new AccountMongoRepository()

  // const dbAuthentication = new DbAuthentication(
  //   accountMongoRepository,
  //   bcryptAdapter,
  //   jwtAdapter,
  //   accountMongoRepository
  // )

  // move to decorators
  // const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  // const logMongoRepository = new LogMongoRepository()
  // return new LogControllerDecorator(loginController, logMongoRepository)

  return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()))
}
