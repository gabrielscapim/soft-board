import OpenAI from 'openai'
import { loadPublishers, loadWebsocketEmitters } from '../setup'

type SendMailOptions = {
  to?: string
  subject?: string
  text?: string
  html?: string
}

export type ApplicationDependencies = {
  openai: OpenAI
  publishers: ReturnType<typeof loadPublishers>
  sendMail: <T>(options: SendMailOptions) => Promise<T>
  websocketEmitters: ReturnType<typeof loadWebsocketEmitters>
}

export type GetApplicationDependencies = () => ApplicationDependencies
