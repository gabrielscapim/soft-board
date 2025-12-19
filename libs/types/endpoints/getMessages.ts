export type GetMessagesQuery = {
  boardId: string
}

export type GetMessagesResultAuthor = {
  userId: string
  name: string
}

export type GetMessagesResultBoardGeneration = {
  id: string
  status: 'pending' | 'error' | 'completed'
  generationDate: string | null
  createDate: string
  updateDate: string
}

export type GetMessagesResultData = {
  id: string
  boardId: string
  author: GetMessagesResultAuthor | null
  content: string | null
  role: 'assistant' | 'user' | 'tool' | 'system'
  toolCallId: string | null
  toolCalled: boolean
  boardGeneration: GetMessagesResultBoardGeneration | null
  sendDate: string
  createDate: string
  updateDate: string
}

export type GetMessagesResult = {
  data: GetMessagesResultData[]
}
