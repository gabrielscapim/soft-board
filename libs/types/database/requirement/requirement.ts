import { INTEGER, TEXT, TIMESTAMPTZ, UUID } from '../common'

export type RequirementDatabase = {
  id: UUID
  teamId: UUID
  boardId: UUID
  authorId: UUID | null
  title: TEXT | null
  description: TEXT | null
  order: INTEGER
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
