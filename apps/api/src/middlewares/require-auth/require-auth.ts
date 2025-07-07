import { RequestHandler } from 'express'

export const requireAuth: RequestHandler = (req, res, next) => {
  const { auth } = req

  if (!auth) {
    res.status(401).end()
    return
  }

  next()
}
