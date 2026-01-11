import { CookieOptions, RequestHandler } from 'express'
import { AUTHENTICATION_COOKIE_NAME, NODE_ENV } from '../../constants'
import { GetApplicationDependencies } from '../../types'

export const auth = false

export function handler (getDeps: GetApplicationDependencies): RequestHandler {
  return async (req, res) => {
    const { publishers } = getDeps()
    const cookieOptions: CookieOptions = {
      signed: true,
      httpOnly: true,
      secure: NODE_ENV === 'production',
      partitioned: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax'
    }

    publishers.userSignedOut.publish({
      userId: req.auth?.userId ?? '',
      eventDate: new Date().toISOString()
    })

    res
      .status(204)
      .clearCookie(AUTHENTICATION_COOKIE_NAME, cookieOptions)
      .end()
  }
}
