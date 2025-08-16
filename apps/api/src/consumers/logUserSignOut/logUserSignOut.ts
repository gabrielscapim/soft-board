import { logger } from '../../libs'
import { UserSignOutEvent } from 'event-types'

export const exchange = 'userSignOut'

export function consumer () {
  return (event: UserSignOutEvent) => {
    logger.info(event, 'User signed out')
  }
}
