import { JSONB, NUMERIC, TEXT, UUID } from '../common'

export type BoardReviewDatabase = {
  id: UUID
  teamId: UUID
  boardId: UUID
  status: 'pending' | 'error' | 'completed'
  toolCallId: TEXT
  error: JSONB | null
  review: JSONB | null
  score: NUMERIC | null
  reviewDate: Date | null
  createDate: Date
  updateDate: Date
}
