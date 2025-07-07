import { RequestHandler } from 'express'
import { AUTHENTICATION_COOKIE_NAME } from '../../constants'
import { AuthenticationData } from '../../types'

// This middleware sets the `req.auth` property based on the signed cookie
export const setAuth: RequestHandler = (req, res, next) => {
  const cookieValue = req.signedCookies[AUTHENTICATION_COOKIE_NAME]

  if (cookieValue) {
    const { userId } = JSON.parse(cookieValue) as AuthenticationData

    req.auth = {
      userId
    }
  }

  next()
}
