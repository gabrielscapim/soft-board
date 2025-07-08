import cors from 'cors'
import express, { type Express } from 'express'
import cookieParser from 'cookie-parser'
import { COOKIE_PARSER_SECRET, CORS_ORIGINS } from '../../constants'
import { AuthenticationData, Endpoint, TeamData } from '../../types'
import { errorHandler, setAuth, setTeam } from '../../middlewares'
import { requireAuth } from '../../middlewares/require-auth'

export type CreateAppOptions = {
  endpoints?: Endpoint[] | Record<string, Omit<Endpoint, 'path'>>
  tests?: {
    auth?: AuthenticationData
    team?: TeamData
  }
}

export function createApp (options: CreateAppOptions = {}): Express {
  const app = express()

  // Set credentials true to allow cookies and other credentials to be sent with requests
  app.use(cors({ origin: CORS_ORIGINS, credentials: true }))

  // Cookie parser is used to parse cookies attached to the client request object
  // The secret is used to sign the cookies, ensuring they are not tampered with
  app.use(cookieParser(COOKIE_PARSER_SECRET))

  // If tests are provided, set the authentication and team data
  if (options.tests) {
    const { auth, team } = options.tests

    if (auth) {
      app.use((req, res, next) => {
        req.auth = auth
        next()
      })
    }

    if (team) {
      app.use((req, res, next) => {
        req.team = team
        next()
      })
    }
  }

  app.use(setAuth)
  app.use(setTeam)

  app.use(express.json())

  // Register endpoints
  for (const endpoint of getEndpoints(options.endpoints)) {
    const {
      path,
      handler,
      method = 'post',
      auth = true
    } = endpoint

    // If endpoint requires authentication, use the requireAuth middleware
    if (auth){
      app[method](path, requireAuth, handler())
    } else {
      app[method](path, handler())
    }
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
