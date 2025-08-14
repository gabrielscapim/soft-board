import { ChatCompletionTool } from 'openai/resources/index'
import { DatabasePool } from 'pg-script'
import { AgentContext } from './agent'

export type ToolOptions = {
  pool: DatabasePool
}

export abstract class Tool {
  protected pool: DatabasePool

  abstract name: string
  abstract description: string

  constructor ({ pool }: ToolOptions) {
    this.pool = pool
  }

  abstract parametersSchema (): any

  abstract run (args: Record<string, any>, context: AgentContext): Promise<string>

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
