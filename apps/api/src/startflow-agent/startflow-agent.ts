import { ChatCompletionMessageFunctionToolCall, ChatCompletionMessageParam, ChatCompletionSystemMessageParam } from 'openai/resources/index'
import { Agent } from './core'
import { logger } from '../libs'

const MAX_COMPLETION_CALLS = 5

export class StartFlowAgent extends Agent {
  protected parseHistory () {
    const history = this.history.map<ChatCompletionMessageParam>(message => {
      if (message.role === 'user') {
        const result: ChatCompletionMessageParam = {
          role: 'user',
          content: message.content ?? '',
          name: message.userName ?? undefined
        }

        return result
      }

      if (message.role === 'assistant') {
        const result: ChatCompletionMessageParam = {
          role: 'assistant',
          content: message.content ?? '',
          tool_calls: (message.toolCalls as Array<ChatCompletionMessageFunctionToolCall>)?.map(toolCall => ({
            id: toolCall.id,
            type: 'function',
            function: {
              name: toolCall.function.name,
              arguments: JSON.stringify(toolCall.function.arguments)
            }
          }))
        }

        return result
      }

      if (message.role === 'tool') {
        const result: ChatCompletionMessageParam = {
          role: 'tool',
          content: message.content ?? '',
          tool_call_id: message.toolCallId!
        }

        return result
      }

      throw new Error(`Unknown message role: ${message.role}`)
    })

    return history
  }

  async run (content: string) {
    const messages: Array<ChatCompletionMessageParam> = []

    if (typeof this.prompt === 'string') {
      messages.push({ role: 'system', content: this.prompt })
    } else {
      messages.push(...this.prompt.map<ChatCompletionSystemMessageParam>(text => ({ role: 'system', content: text })))
    }

    messages.push(...this.parseHistory(), { role: 'user', content })

    const responseMessages: Array<ChatCompletionMessageParam & { executionTimeMs?: number }> = []
    const accumulatedToolMessagesResult: Array<ChatCompletionMessageParam> = []

    let completionCalls = 0

    while (completionCalls < MAX_COMPLETION_CALLS) {
      const now = performance.now()

      const completion = await this.openai.chat.completions.create({
        ...(this.model === 'gpt-5' ? { reasoning_effort: 'minimal' } : {}),
        model: this.model,
        messages: [
          ...messages,
          ...responseMessages,
          ...accumulatedToolMessagesResult
        ],
        tool_choice: this.toolChoice,
        tools: this.tools.map(tool => tool.toChatCompletion()),
        parallel_tool_calls: true
      })

      const executionTimeMs = performance.now() - now

      const response = completion.choices[0].message
      const requestedTools = response.tool_calls as ChatCompletionMessageFunctionToolCall[]

      responseMessages.push({
        ...response,
        executionTimeMs
      })

      // If there are no tool calls, we can return the messages
      if (!requestedTools?.length) {
        return [
          ...responseMessages,
          ...accumulatedToolMessagesResult
        ]
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

          if (tool.generateCompletion === false) {
            return [
              ...responseMessages,
              ...accumulatedToolMessagesResult
            ]
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
