import OpenAI from 'openai'
import Nodemailer from 'nodemailer'
import { loadPublishers, loadWebsocketEmitters } from '../setup'

export type ApplicationDependencies = {
  nodemailerTransport: Nodemailer.Transporter
  openai: OpenAI
  publishers: ReturnType<typeof loadPublishers>
  websocketEmitters: ReturnType<typeof loadWebsocketEmitters>
}

export type GetApplicationDependencies = () => ApplicationDependencies
