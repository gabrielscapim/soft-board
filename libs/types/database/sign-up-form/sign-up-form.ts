import { TEXT, UUID, VARCHAR_255 } from '../common'

export type SignUpFormDatabase = {
  id: UUID
  name: VARCHAR_255
  email: VARCHAR_255
  normalizedEmail: VARCHAR_255
  passwordHash: VARCHAR_255
  codeHash: TEXT
  createDate: Date
  expireDate: Date
  useDate: Date | null
}
