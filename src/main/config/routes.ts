import { Express, Router } from 'express'
// import fg from 'fast-glob'
import { readdirSync } from 'fs'
export default (app:Express) : void => {
  const router = Router()
  app.use('/api', router)
  // importa automaticamento todos os arquivos de rotas
  // o ' import {} from ' tem muda para ' import('') '
  // tbm precisa do await.
  // tbm não podemos dar um nome

  // fg.sync('**/src/main/routes/**routes.ts').map(async file => {
  //   (await import(`../../../${file}`)).default(router)
  // })

  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (!file.includes('.test.') && !file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
