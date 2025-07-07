import { CookieOptions, RequestHandler } from 'express'
import { AUTHENTICATION_COOKIE_NAME, NODE_ENV } from '../../constants'

export const auth = false

export function handler (): RequestHandler {
  return async (req, res) => {
    const cookieOptions: CookieOptions = {
      signed: true,
      httpOnly: true,
      secure: NODE_ENV === 'production',
      partitioned: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax'
    }

    res
      .status(204)
      .clearCookie(AUTHENTICATION_COOKIE_NAME, cookieOptions)
      .end()
  }
}
