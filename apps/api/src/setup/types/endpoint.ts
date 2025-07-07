import { RequestHandler } from 'express'

export type Endpoint = {
  path: string
  handler: ((deps?: any) => RequestHandler) // Deps can be used for dependency injection
  method?: 'get' | 'post'
  auth?: boolean
}
