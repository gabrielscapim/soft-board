import { JSONB, TEXT, TIMESTAMPTZ, UUID } from '../common'

export type MessageDatabase = {
  id: UUID
  teamId: UUID
  boardId: UUID
  authorId: UUID | null
  content: TEXT | null
  role: 'assistant' | 'user' | 'tool' | 'system'
  toolCallId: UUID | null
  toolCalls: JSONB[] | null
  sendDate: TIMESTAMPTZ
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
