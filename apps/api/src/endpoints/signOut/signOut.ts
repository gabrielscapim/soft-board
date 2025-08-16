import { CookieOptions, RequestHandler } from 'express'
import { AUTHENTICATION_COOKIE_NAME, NODE_ENV } from '../../constants'
import { UserSignedOutEvent } from 'event-types'
import { IPublisher } from '../../types'

export const auth = false

type Deps = {
  userSignedOut: IPublisher<UserSignedOutEvent>
}

export function handler (deps: Deps): RequestHandler {
  return async (req, res) => {
    const cookieOptions: CookieOptions = {
      signed: true,
      httpOnly: true,
      secure: NODE_ENV === 'production',
      partitioned: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax'
    }

    deps.userSignedOut.publish({
      userId: req.auth?.userId ?? '',
      eventDate: new Date().toISOString()
    })

    res
      .status(204)
      .clearCookie(AUTHENTICATION_COOKIE_NAME, cookieOptions)
      .end()
  }
}
