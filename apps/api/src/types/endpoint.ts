import { RequestHandler } from 'express'

export type Endpoint = {
  path: string
  handler: (getDeps?: any) => RequestHandler
  method?: 'get' | 'post'
  auth?: boolean
}
