// import app from './config/app'
import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'
MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    // como pode chamar algum método que pode precisar do mongo,
    // start o serve só depois de ter a conexão
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running att http://localhost:${env.port}`))
  })
  .catch((error) => {
    console.error(error)
  })
