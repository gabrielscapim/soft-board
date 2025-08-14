import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index'
import { Tool } from './tool'

export type AgentOptions = {
  context: AgentContext
  openai: OpenAI
  history?: Array<ChatCompletionMessageParam>
  model?: string
  prompt?: string
  tools?: Array<Tool>
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

const DEFAULT_MODEL = 'gpt-5'
const DEFAULT_PROMPT = 'You are a helpful assistant.'

export abstract class Agent {
  protected context: AgentContext
  protected openai: OpenAI
  protected history: Array<ChatCompletionMessageParam>
  protected model: string
  protected prompt: string
  protected tools: Array<Tool>

  constructor ({ context, openai, history, model, prompt, tools }: AgentOptions) {
    this.context = context
    this.openai = openai
    this.history = history ?? []
    this.model = model ?? DEFAULT_MODEL
    this.prompt = prompt ?? DEFAULT_PROMPT
    this.tools = tools ?? []
  }

  abstract run (content: string): Promise<Array<ChatCompletionMessageParam>>
}
