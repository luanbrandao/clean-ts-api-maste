import { badRequest, serverError, anauthorized, notFound, forbidden } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  anauthorized,
  notFound,
  forbidden
}
