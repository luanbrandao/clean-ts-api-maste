import { loginPath } from './paths'
import { accountSchema, loginParamsSchema, errorSchema } from './schemas'
import { badRequest, serverError, anauthorized, notFound } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'Doc do curso NodeJs usando Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns',
    version: '1.0.0',
    contact: {
      name: 'luanbrandao',
      email: 'luanbrandao4@gmail.com',
      url: 'https://www.linkedin.com/in/lb4/'
    }
  },
  license: {
    name: '',
    url: ''
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login1'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    anauthorized,
    notFound
  }
}
