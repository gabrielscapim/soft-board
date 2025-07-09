import { RequestHandler } from 'express'
import { UpdateMemberRoleCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, getPool } from '../../libs'
import { BadRequest } from 'http-errors'

type Handler = RequestHandler<unknown, unknown, UpdateMemberRoleCommand>

const schema = yup.object({
  memberId: yup.string().uuid().required(),
  role: yup.string().oneOf(['member', 'admin']).required()
})

export function handler (): Handler {
  return async (req, res) => {
    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can update member roles')

    const teamId = req.team!.teamId
    const { memberId, role } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    const member = await pool
      .SELECT<{ userId: string }>`user_id`
      .FROM`member`
      .WHERE`id = ${memberId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Member with id ${memberId} not found` })

    if (member.userId === req.auth!.userId) {
      throw new BadRequest('You cannot change your own role')
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
