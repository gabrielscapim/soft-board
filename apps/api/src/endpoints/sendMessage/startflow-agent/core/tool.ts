import { ChatCompletionTool } from 'openai/resources/index'
import { DatabasePool } from 'pg-script'

export type ToolOtions = {
  boardId: string
  pool: DatabasePool
}

export abstract class Tool {
  protected boardId: string
  protected pool: DatabasePool

  abstract name: string
  abstract description: string

  constructor ({ boardId, pool }: ToolOtions) {
    this.boardId = boardId
    this.pool = pool
  }

  abstract parametersSchema (): any

  abstract run (args: Record<string, any>): Promise<string>

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
