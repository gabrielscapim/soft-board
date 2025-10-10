import { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources/index'
import { AgentContext } from './agent'

export type ToolData = object

export type RunToolResult = {
  content: string
  messages?: Array<ChatCompletionMessageParam>
}
export abstract class Tool {
  protected data?: ToolData

  abstract name: string
  abstract description: string
  abstract generateCompletion: boolean

  constructor (data?: ToolData) {
    this.data = data
  }

  abstract parametersSchema (): any

  abstract run (args: Record<string, any>, context: AgentContext, id: string): Promise<RunToolResult>

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
