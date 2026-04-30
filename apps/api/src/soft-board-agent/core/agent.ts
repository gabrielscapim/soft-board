import OpenAI from 'openai'
import {
  ChatCompletionMessageParam,
  ChatCompletionRole,
  ChatCompletionToolChoiceOption,
  ResponseFormatJSONSchema,
  ResponseFormatText
} from 'openai/resources'
import { Tool } from './tool'

export type AgentOptions = {
  context: AgentContext
  openai: OpenAI
  history?: Array<MessageHistory>
  model?: string
  prompt?: string | Array<string>
  tools?: Array<Tool>
  toolChoice?: ChatCompletionToolChoiceOption
  responseFormat?: ResponseFormatText | ResponseFormatJSONSchema
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
}

const DEFAULT_MODEL = 'gpt-5.5'
const DEFAULT_PROMPT = 'You are a helpful assistant.'

export abstract class Agent {
  protected context: AgentContext
  protected openai: OpenAI
  protected history: Array<MessageHistory>
  protected model: string
  protected prompt: string | Array<string>
  protected tools: Array<Tool>
  protected toolChoice: ChatCompletionToolChoiceOption | undefined
  protected responseFormat: ResponseFormatText | ResponseFormatJSONSchema | undefined

  constructor (options: AgentOptions) {
    this.context = options.context
    this.openai = options.openai
    this.history = options.history ?? []
    this.model = options.model ?? DEFAULT_MODEL
    this.prompt = options.prompt ?? DEFAULT_PROMPT
    this.tools = options.tools ?? []
    this.toolChoice = options.toolChoice
    this.responseFormat = options.responseFormat
  }

  protected abstract parseHistory (): Array<ChatCompletionMessageParam>

  abstract run (input: string): Promise<Array<ChatCompletionMessageParam>>
}
