import { JSONB, TIMESTAMPTZ, UUID, VARCHAR_50 } from '../common'

export type ComponentDatabase = {
  id: UUID
  teamId: UUID
  boardId: UUID
  type: VARCHAR_50
  properties: JSONB
  connectionId: UUID | null
  screenId: UUID | null
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
