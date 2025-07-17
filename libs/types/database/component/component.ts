import { BOOLEAN, JSONB, TIMESTAMPTZ, UUID, VARCHAR_255, VARCHAR_50 } from '../common'

export type ComponentDatabase = {
  id: UUID
  teamId: UUID
  boardId: UUID
  name: VARCHAR_255
  type: VARCHAR_50
  properties: JSONB
  deleted: BOOLEAN
  connectionId: UUID | null
  screenId: UUID | null
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
