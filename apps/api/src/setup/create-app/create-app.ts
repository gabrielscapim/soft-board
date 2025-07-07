import cors from 'cors'
import express, { type Express } from 'express'
import { CORS_ORIGINS } from '../../constants'
import { Endpoint } from '../../types'
import { errorHandler, setAuth } from '../../middlewares'

export type CreateAppOptions = {
  endpoints?: Endpoint[] | Record<string, Omit<Endpoint, 'path'>>
}

export function createApp (options: CreateAppOptions = {}): Express {
  const app = express()

  // Set credentials true to allow cookies and other credentials to be sent with requests
  app.use(cors({ origin: CORS_ORIGINS, credentials: true }))

  app.use(setAuth)

  app.use(express.json())

  // Register endpoints
  for (const endpoint of getEndpoints(options.endpoints)) {
    const method = endpoint.method ?? 'post'
    app[method](endpoint.path, endpoint.handler())
  }

  // Should be the last middleware because will handle errors from all previous middlewares
  app.use(errorHandler)

  return app
}

// Helper function to get endpoints in a consistent format
function getEndpoints (endpoints: CreateAppOptions['endpoints']): Endpoint[] {
  if (!endpoints) {
    return []
  }

  if (Array.isArray(endpoints)) {
    return endpoints
  }

  return Object.entries(endpoints).map(([key, value]) => ({
    path: `/${key}`,
    ...value
  }))
}
