import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index'
import { Tool } from './tool'

export type AgentOptions = {
  openai: OpenAI
  history?: Array<ChatCompletionMessageParam>
  model?: string
  prompt?: string
  tools?: Array<Tool>
}

const DEFAULT_MODEL = 'gpt-4.1'
const DEFAULT_PROMPT = 'You are a helpful assistant.'

export abstract class Agent {
  protected openai: OpenAI
  protected history: Array<ChatCompletionMessageParam>
  protected model: string
  protected prompt: string
  protected tools: Array<Tool>

  constructor ({ openai, history, model, prompt, tools }: AgentOptions) {
    this.openai = openai
    this.history = history ?? []
    this.model = model ?? DEFAULT_MODEL
    this.prompt = prompt ?? DEFAULT_PROMPT
    this.tools = tools ?? []
  }

  abstract run (content: string): Promise<Array<ChatCompletionMessageParam>>
}
