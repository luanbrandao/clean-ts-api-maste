import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpCOntroller } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'
// import { makeLogControllerDecorator } from '../factories/decorators/log-controller-decorator-factory'

export default (router:Router): void => {
  router.post('/signup', adaptRoute(makeSignUpCOntroller()))
  router.post('/login', adaptRoute(makeLoginController()))
  // do not use
  // router.post('/signup', adaptRoute( makeLogControllerDecorator(makeSignUpCOntroller())))
  // router.post('/login', adaptRoute(makeLogControllerDecorator(makeLoginController())))
}
