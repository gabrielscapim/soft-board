import { TEXT, TIMESTAMPTZ, UUID, VARCHAR_255 } from '../common'

export type UserDatabase = {
  id: UUID
  name: VARCHAR_255
  email: VARCHAR_255
  normalizedEmail: VARCHAR_255 | null
  passwordHash: TEXT | null
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
