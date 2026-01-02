import { RequestHandler } from 'express'
import { ApplicationDependencies } from './application-dependencies'

export type Endpoint = {
  path: string
  handler: (getDeps?: () => ApplicationDependencies | undefined) => RequestHandler
  method?: 'get' | 'post'
  auth?: boolean
}
