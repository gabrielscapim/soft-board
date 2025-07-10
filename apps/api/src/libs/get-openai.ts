import OpenAI from 'openai'
import { OPENAI_API_KEY } from '../constants'

let openai: OpenAI | undefined

export function getOpenai (): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: OPENAI_API_KEY
    })
  }

  return openai
}
