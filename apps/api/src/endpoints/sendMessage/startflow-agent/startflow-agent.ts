import { ChatCompletionMessageParam } from 'openai/resources/index'
import { Agent } from './core'
import { logger } from '../../../libs'

const MAX_COMPLETION_CALLS = 5

export class StartFlowAgent extends Agent {
  async run (content: string) {
    const messages: Array<ChatCompletionMessageParam> = [
      { role: 'system', content: this.prompt },
      ...this.history,
      { role: 'user', content }
    ]

    const responseMessages: Array<ChatCompletionMessageParam> = []

    let completionCalls = 0

    while (completionCalls < MAX_COMPLETION_CALLS) {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          ...messages,
          ...responseMessages
        ],
        tools: this.tools.map(tool => tool.toChatCompletion()),
        parallel_tool_calls: true
      })

      const response = completion.choices[0].message
      const requestedTools = response.tool_calls

      responseMessages.push(response)

      // If there are no tool calls, we can return the messages
      if (!requestedTools?.length) {
        return responseMessages
      }

      // Process each requested tool
      for (const requestedTool of requestedTools) {
        const tool = this.tools.find(t => t.name === requestedTool.function.name)

        if (!tool) {
          responseMessages.push({
            role: 'tool',
            tool_call_id: requestedTool.id,
            content: `Tool ${requestedTool.function.name} not found.`
          })

          continue
        }

        try {
          const args = JSON.parse(requestedTool.function.arguments)
          const result = await tool.run(args, this.context)

          responseMessages.push({
            role: 'tool',
            tool_call_id: requestedTool.id,
            content: result
          })
        } catch (error) {
          logger.error({ error }, `Error running tool ${requestedTool.function.name}`)

          responseMessages.push({
            role: 'tool',
            tool_call_id: requestedTool.id,
            content: `Error running tool ${requestedTool.function.name}.`
          })
        }
      }

      // Increment the completion calls
      completionCalls += 1
    }

    return responseMessages
  }
}
