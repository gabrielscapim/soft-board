export type SendMessageCommand = {
  boardId: string
  content: string
}

export type SendMessageResult = {
  id: string
  content: string | null
}
