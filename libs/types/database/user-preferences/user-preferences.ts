import { TIMESTAMPTZ, UUID, VARCHAR_10 } from '../common'

export type UserPreferencesDatabase = {
  id: UUID
  userId: UUID
  language: VARCHAR_10
  acceptedTutorial: boolean | null
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
