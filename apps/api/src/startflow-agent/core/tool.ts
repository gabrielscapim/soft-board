import { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources/index'
import { DatabasePool } from 'pg-script'
import { AgentContext } from './agent'
import { IPublisher } from '../../types'

export type ToolOptions = {
  pool: DatabasePool
  publishers: Record<string, IPublisher<any>>
}

export type RunToolResult = {
  content: string
  messages?: Array<ChatCompletionMessageParam>
}

export abstract class Tool {
  protected pool: DatabasePool
  protected publishers: Record<string, IPublisher<any>>

  abstract name: string
  abstract description: string

  constructor ({ pool, publishers }: ToolOptions) {
    this.pool = pool
    this.publishers = publishers
  }

  abstract parametersSchema (): any

  abstract run (args: Record<string, any>, context: AgentContext): Promise<RunToolResult>

  toChatCompletion (): ChatCompletionTool {
    return {
      type: 'function',
      function: {
        name: this.name,
        description: this.description,
        parameters: this.parametersSchema()
      }
    }
  }
}
