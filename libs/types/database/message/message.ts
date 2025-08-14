import { INTEGER, JSONB, TEXT, TIMESTAMPTZ, UUID } from '../common'

export type MessageDatabase = {
  id: UUID
  teamId: UUID
  boardId: UUID
  authorId: UUID | null
  content: TEXT | null
  type: 'text' | 'image'
  role: 'assistant' | 'user' | 'tool' | 'system'
  toolCallId: UUID | null
  toolCalls: JSONB[] | null
  error: JSONB | null
  executionTimeMs: INTEGER | null
  sendDate: TIMESTAMPTZ
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
