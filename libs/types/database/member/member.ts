import { TIMESTAMPTZ, UUID } from '../common'

export type MemberDatabase = {
  id: UUID
  userId: UUID
  workspaceId: UUID
  role: 'owner' | 'admin' | 'member'
  createDate: TIMESTAMPTZ
  updateDate: TIMESTAMPTZ
}
