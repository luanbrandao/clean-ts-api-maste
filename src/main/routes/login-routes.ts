import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpCOntroller } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default (router:Router): void => {
  router.post('/signup', adaptRoute(makeSignUpCOntroller()))
  router.post('/login', adaptRoute(makeLoginController()))
}
