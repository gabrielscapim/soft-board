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

    const responseMessages: Array<ChatCompletionMessageParam & { executionTimeMs?: number }> = []
    const accumulatedToolMessagesResult: Array<ChatCompletionMessageParam> = []

    let completionCalls = 0

    while (completionCalls < MAX_COMPLETION_CALLS) {
      const now = performance.now()

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          ...messages,
          ...responseMessages
        ],
        tools: this.tools.map(tool => tool.toChatCompletion()),
        parallel_tool_calls: true
      })

      const executionTimeMs = performance.now() - now

      const response = completion.choices[0].message
      const requestedTools = response.tool_calls

      responseMessages.push({
        ...response,
        executionTimeMs
      })

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

        const now = performance.now()

        try {
          const args = JSON.parse(requestedTool.function.arguments)
          const result = await tool.run(args, this.context)

          responseMessages.push({
            role: 'tool',
            tool_call_id: requestedTool.id,
            content: result.content,
            executionTimeMs: performance.now() - now
          })

          if (result.messages) {
            accumulatedToolMessagesResult.push(...result.messages)
          }
        } catch (error) {
          logger.error({ error }, `Error running tool ${requestedTool.function.name}`)

          responseMessages.push({
            role: 'tool',
            tool_call_id: requestedTool.id,
            content: `Error running tool ${requestedTool.function.name}.`,
            executionTimeMs: performance.now() - now
          })
        }
      }

      // Increment the completion calls
      completionCalls += 1
    }

    return [
      ...responseMessages,
      ...accumulatedToolMessagesResult
    ]
  }
}
