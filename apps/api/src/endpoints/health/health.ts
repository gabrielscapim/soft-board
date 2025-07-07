import { RequestHandler } from 'express'

export const auth = false

export const method = 'get'

export function handler (_deps: never): RequestHandler {
  return async (_req, res) => {
    res.status(200).json({ message: 'Ok' })
  }
}
