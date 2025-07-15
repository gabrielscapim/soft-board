export type SendMessageCommand = {
  boardId: string
  content: string
}

export type SendMessageResultToolCall = {
  id: string
  type: 'function'
  function: {
    name: string
    arguments: string
  }
}

export type SendMessageResultMessage = {
  id: string
  role: 'user' | 'assistant' | 'tool'
  content: string | null
  toolCalls: SendMessageResultToolCall[] | null
}

export type SendMessageResult = {
  messages: SendMessageResultMessage[]
}
