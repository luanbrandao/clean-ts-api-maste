import paths from './paths'
import components from './components'
import schemas from './schemas'

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
  tags: [
    { name: 'Login' },
    { name: 'Enquete' }
  ],
  paths,
  schemas,
  components
}
