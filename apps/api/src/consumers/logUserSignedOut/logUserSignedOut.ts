import { logger } from '../../libs'
import { UserSignedOutEvent } from 'event-types'

export const exchange = 'userSignedOut'

export function consumer () {
  return (event: UserSignedOutEvent) => {
    logger.info(event, 'User signed out')
  }
}
