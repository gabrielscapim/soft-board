import { Forbidden } from 'http-errors'
import { MemberDatabase } from 'types/database'

type Role = Pick<MemberDatabase, 'role'>['role']

const DEFAULT_ERROR_MESSAGE = 'You do not have permission to perform this action.'

export function assertMemberPermission (
  memberRole: Role,
  required: Role | Role[] = ['admin', 'owner'],
  errorMessage = DEFAULT_ERROR_MESSAGE
): void {
  if (Array.isArray(required)) {
    if (!required.includes(memberRole)) {
      throw new Forbidden(errorMessage)
    }
  } else if (memberRole !== required) {
    throw new Forbidden(errorMessage)
  }
}
