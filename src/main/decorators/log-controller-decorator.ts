import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'

export class LogControllerDecorator implements Controller {
  private readonly controller:Controller;
  private readonly logErrorRepository: LogErrorRepository;

  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    // como é do mesmo tipo pode chamar o handle
    // continua fazendo a mesma coisa, porém agora pode add novos comportamentos
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }

    // test
    // return new Promise(resolve => resolve({
    //   statusCode: httpResponse.statusCode,
    //   body: httpResponse.body
    // }))

    return httpResponse
  }
}
