import cors from 'cors'
import express, { type Express } from 'express'
import { CORS_ORIGINS } from '../../constants'
import { Endpoint } from '../../types'
import { errorHandler, setAuth } from '../../middlewares'

export type CreateAppOptions = {
  endpoints?: Endpoint[]
}

export function createApp (options: CreateAppOptions = {}): Express {
  const app = express()

  // Set credentials true to allow cookies and other credentials to be sent with requests
  app.use(cors({ origin: CORS_ORIGINS, credentials: true }))

  app.use(setAuth)

  app.use(express.json())

  for (const endpoint of options.endpoints ?? []) {
    const method = endpoint.method ?? 'post'
    app[method](endpoint.path, endpoint.handler())
  }

  // Should be the last middleware because will handle errors from all previous middlewares
  app.use(errorHandler)

  return app
}
