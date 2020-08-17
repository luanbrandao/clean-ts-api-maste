import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller:Controller;

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    // como é do mesmo tipo pode chamar o handle
    // continua fazendo a mesma coisa, porém agora pode add novos comportamentos
    const httpResponse = await this.controller.handle(httpRequest)
    // if (httpResponse.statusCode === 500) {
    //   // log
    // }
    // return null

    // test
    return new Promise(resolve => resolve({
      statusCode: httpResponse.statusCode,
      body: httpResponse.body
    }))
  }
}
