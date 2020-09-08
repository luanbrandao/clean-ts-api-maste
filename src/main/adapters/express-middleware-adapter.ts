import { HttpRequest, Middleware } from '../../presentation/protocols'
import { Request, Response, NextFunction } from 'express'

// Adapter pois o express espera nas rotas o (res,req)

export const adaptMiddleware = (middlware: Middleware) => {
  return async (req: Request, res: Response, next:NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }

    const httpResponse = await middlware.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      // proxy
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
