import OpenAI from 'openai'
import { loadPublishers, loadWebsocketEmitters } from '../setup'

export type ApplicationDependencies = {
  openai: OpenAI
  publishers: ReturnType<typeof loadPublishers>
  websocketEmitters: ReturnType<typeof loadWebsocketEmitters>
}

export type GetApplicationDependencies = () => ApplicationDependencies
