import { TIMESTAMPTZ, UUID, VARCHAR_255 } from '../common'

export type TeamDatabase = {
  id: UUID
  name: VARCHAR_255
  slug: VARCHAR_255
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
