import OpenAI from 'openai'
import {
  ChatCompletionMessageParam,
  ChatCompletionRole,
  ResponseFormatJSONObject,
  ResponseFormatJSONSchema,
  ResponseFormatText
} from 'openai/resources/index'
import { Tool } from './tool'

export type AgentOptions = {
  context: AgentContext
  openai: OpenAI
  history?: Array<MessageHistory>
  model?: string
  prompt?: string | Array<string>
  tools?: Array<Tool>
  responseFormat?: ResponseFormat
}

export type AgentContext = {
  board: {
    id: string
    step: string
  }
  team: {
    id: string
    slug: string
  }
  user: {
    id: string
  }
}

export type MessageHistory = {
  role: ChatCompletionRole
  content?: string | null
  toolCalls?: Record<string, any>[] | null
  toolCallId?: string | null
  userName?: string | null
  responseFormat?: ResponseFormat
}

export type ResponseFormat =
  | ResponseFormatText
  | ResponseFormatJSONSchema
  | ResponseFormatJSONObject

const DEFAULT_MODEL = 'gpt-5'
const DEFAULT_PROMPT = 'You are a helpful assistant.'

export abstract class Agent {
  protected context: AgentContext
  protected openai: OpenAI
  protected history: Array<MessageHistory>
  protected model: string
  protected prompt: string | Array<string>
  protected tools: Array<Tool>
  protected responseFormat: ResponseFormat

  constructor ({ context, openai, history, model, prompt, tools, responseFormat }: AgentOptions) {
    this.context = context
    this.openai = openai
    this.history = history ?? []
    this.model = model ?? DEFAULT_MODEL
    this.prompt = prompt ?? DEFAULT_PROMPT
    this.tools = tools ?? []
    this.responseFormat = responseFormat ?? { type: 'text' }
  }

  protected abstract parseHistory (): Array<ChatCompletionMessageParam>

  abstract run (input: string): Promise<Array<ChatCompletionMessageParam>>
}
