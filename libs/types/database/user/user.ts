import { TEXT, TIMESTAMPTZ, UUID, VARCHAR_255 } from '../common'

export type UserDatabase = {
  id: UUID
  name: VARCHAR_255
  email: VARCHAR_255
  normalized_email: VARCHAR_255 | null
  password_hash: TEXT | null
  create_date: TIMESTAMPTZ
  update_date: TIMESTAMPTZ
}
