import { TIMESTAMPTZ, UUID } from '../common'

export type MemberDatabase = {
  id: UUID
  user_id: UUID
  workspace_id: UUID
  role: 'owner' | 'admin' | 'member'
  create_date: TIMESTAMPTZ
  update_date: TIMESTAMPTZ
}
