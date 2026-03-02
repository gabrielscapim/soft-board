import { BYTEA, TIMESTAMPTZ, UUID, VARCHAR_255, VARCHAR_50 } from '../common'

export type TeamDatabase = {
  id: UUID
  name: VARCHAR_255
  slug: VARCHAR_255
  logo: BYTEA | null
  logoMimeType: VARCHAR_50 | null
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
