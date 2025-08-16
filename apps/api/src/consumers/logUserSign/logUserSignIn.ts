import { logger } from '../../libs'
import { UserSignInEvent } from 'event-types'

export const exchange = 'userSignIn'

export function consumer () {
  return (event: UserSignInEvent) => {
    logger.info(event, 'User signed in')
  }
}
