import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignUpCOntroller } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
// import { makeLogControllerDecorator } from '../factories/decorators/log-controller-decorator-factory'

export default (router:Router): void => {
  router.post('/signup', adaptRoute(makeSignUpCOntroller()))
  router.post('/login', adaptRoute(makeLoginController()))
  // do not use
  // router.post('/signup', adaptRoute( makeLogControllerDecorator(makeSignUpCOntroller())))
  // router.post('/login', adaptRoute(makeLogControllerDecorator(makeLoginController())))
}
