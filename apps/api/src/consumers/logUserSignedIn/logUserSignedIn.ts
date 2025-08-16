import { logger } from '../../libs'
import { UserSignedInEvent } from 'event-types'

export const exchange = 'userSignedIn'

export function consumer () {
  return (event: UserSignedInEvent) => {
    logger.info(event, 'User signed in')
  }
}
