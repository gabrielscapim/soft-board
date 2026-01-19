import { asValue, AwilixContainer } from 'awilix'
import { ApplicationDependencies } from '../../types'
import OpenAI from 'openai'
import { loadPublishers } from '../load-publishers'
import { loadWebsocketEmitters } from '../load-websocket-emitters'

type Container = AwilixContainer<ApplicationDependencies>

export function registerApplicationDependencies (
  container: Container,
  deps: Partial<ApplicationDependencies>
): Container {
  const { openai, publishers, sendMail, websocketEmitters } = deps

  container.register({
    openai: asValue(openai ?? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })),
    publishers: asValue(publishers ?? loadPublishers()),
    sendMail: asValue(sendMail ?? (() => Promise.reject())),
    websocketEmitters: asValue(websocketEmitters ?? loadWebsocketEmitters())
  })

  return container
}
