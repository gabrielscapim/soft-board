import { TEXT, TIMESTAMPTZ, UUID } from '../common'

export type BoardShareDatabase = {
  id: UUID
  teamId: UUID
  boardId: UUID
  token: TEXT
  expireDate: TIMESTAMPTZ | null
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
