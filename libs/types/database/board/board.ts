import { TIMESTAMPTZ, UUID, VARCHAR_255, VARCHAR_50 } from '../common'

export type BoardDatabase = {
  id: UUID
  teamId: UUID
  title: VARCHAR_255 | null
  authorId: UUID | null
  image: VARCHAR_255 | null
  step: VARCHAR_50
  status: 'idle' | 'error' | 'pending'
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
