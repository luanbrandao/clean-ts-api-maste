/* eslint-disable no-undef */
import app from '../../main/config/app'
import request from 'supertest'

describe('Body Parser Middleware', () => {
  // o express não faz por padrão o parsed json
  test('Should parse body as json', async () => {
    // rota temporário para o test
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Rodrigo' })
      .expect({ name: 'Rodrigo' })
  })
})
