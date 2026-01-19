import { RequestHandler } from 'express'
import { UpdateMemberRoleCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, createAppHttpError, getPool } from '../../libs'
import { MemberDatabase } from 'types/database'

type Handler = RequestHandler<unknown, unknown, UpdateMemberRoleCommand>

const schema = yup.object({
  memberId: yup.string().uuid().required(),
  role: yup.string().oneOf(['member', 'admin']).required()
})

type MemberRow = Pick<MemberDatabase, 'userId' | 'role'>

export function handler (): Handler {
  return async (req, res) => {
    assertMemberPermission(req.team!.memberRole, ['owner'], 'Only team owners can update member roles')

    const teamId = req.team!.teamId
    const { memberId, role } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    const member = await pool
      .SELECT<MemberRow>`user_id, role`
      .FROM`member`
      .WHERE`id = ${memberId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Member with id ${memberId} not found` })

    if (member.userId === req.auth!.userId) {
      throw createAppHttpError(400, 'CANNOT_CHANGE_OWN_ROLE', 'You cannot change your own role')
    }

    if (member.role === 'owner') {
      throw createAppHttpError(400, 'CANNOT_CHANGE_OWNER_ROLE', 'You cannot change the role of an owner')
    }

    await pool
      .UPDATE`member`
      .SET({
        role,
        updateDate: new Date()
      })
      .WHERE`id = ${memberId}`
      .AND`team_id = ${teamId}`

    res.status(204).end()
  }
}
