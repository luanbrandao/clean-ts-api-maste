export const anauthorized = {
  description: 'Credenciais Inválidas',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
