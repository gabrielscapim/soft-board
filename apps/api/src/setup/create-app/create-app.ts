import cors from 'cors'
import express, { type Express } from 'express'
import { CORS_ORIGINS } from '../../constants'
import { Endpoint } from '../types'

export type CreateAppOptions = {
  endpoints?: Endpoint[]
}

export function createApp (options: CreateAppOptions = {}): Express {
  const app = express()

  app.use(cors({ origin: CORS_ORIGINS }))
  app.use(express.json())

  for (const endpoint of options.endpoints ?? []) {
    const method = endpoint.method ?? 'post'
    app[method](endpoint.path, endpoint.handler())
  }

  return app
}
