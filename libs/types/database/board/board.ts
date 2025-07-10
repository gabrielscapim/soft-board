import { TIMESTAMPTZ, UUID, VARCHAR_255 } from '../common'

export type BoardDatabase = {
  id: UUID
  teamId: UUID
  title: VARCHAR_255 | null
  authorId: UUID | null
  image: VARCHAR_255 | null
  step: 'init'
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
