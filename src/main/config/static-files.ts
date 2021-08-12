import express from 'express'
import { resolve } from 'path'

export default (app: any): void => {
  // app.use('/static', express.static(resolve(__dirname, '../../static')))
  app.use('/static', express.static(resolve(__dirname, '../../../public')))
}
