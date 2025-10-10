import { INTEGER, JSONB, TEXT, UUID } from '../common'

export type BoardGenerationDatabase = {
  id: UUID
  teamId: UUID
  boardId: UUID
  status: 'pending' | 'error' | 'completed'
  toolCallId: TEXT
  error: JSONB | null
  promptTokens: INTEGER | null
  completionTokens: INTEGER | null
  totalTokens: INTEGER | null
  exectionTimeMs: INTEGER | null
  generationDate: Date | null
  createDate: Date
  updateDate: Date
}
