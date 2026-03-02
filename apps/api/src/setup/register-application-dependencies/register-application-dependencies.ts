import { asValue, AwilixContainer } from 'awilix'
import { ApplicationDependencies } from '../../types'

type Container = AwilixContainer<ApplicationDependencies>

export function registerApplicationDependencies (
  container: Container,
  deps: ApplicationDependencies
): Container {
  const { openai, pool, publishers, sendMail, websocketEmitters } = deps

  container.register({
    openai: asValue(openai),
    pool: asValue(pool),
    publishers: asValue(publishers),
    sendMail: asValue(sendMail),
    websocketEmitters: asValue(websocketEmitters)
  })

  return container
}
