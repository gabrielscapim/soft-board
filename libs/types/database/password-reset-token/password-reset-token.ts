import { TEXT, TIMESTAMPTZ, UUID } from '../common'

export type PasswordResetTokenDatabase = {
  id: UUID
  userId: UUID
  tokenHash: TEXT
  createDate: TIMESTAMPTZ
  expireDate: TIMESTAMPTZ
  useDate: TIMESTAMPTZ | null
}
