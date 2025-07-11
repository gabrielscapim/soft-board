import { INTEGER, TEXT, TIMESTAMPTZ, UUID } from '../common'

export type RequirementDatabase = {
  id: UUID
  teamId: UUID
  boardId: UUID
  authorId: UUID | null
  content: TEXT
  order: INTEGER
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
