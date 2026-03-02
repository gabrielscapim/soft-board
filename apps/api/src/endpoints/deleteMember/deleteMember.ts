import { RequestHandler } from 'express'
import { DeleteMemberCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, createAppHttpError } from '../../libs'
import { MemberDatabase } from 'types/database'
import { GetApplicationDependencies } from '../../types'

type Handler = RequestHandler<unknown, unknown, DeleteMemberCommand>

type MemberRow = Pick<MemberDatabase, 'id' | 'role'>

const schema = yup.object({
  memberId: yup.string().trim().required('Member ID is required')
})

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    assertMemberPermission(req.team!.memberRole, ['owner'], 'Only team owners can delete members')

    const teamId = req.team!.teamId
    const userId = req.auth?.userId
    const { memberId } = schema.validateSync(req.body, { abortEarly: false })
    const { pool } = getDeps()

    const clientMember = await pool
      .SELECT<MemberRow>`id, role`
      .FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`user_id = ${userId}`
      .find()

    if (clientMember.id === memberId) {
      throw createAppHttpError(400, 'CANNOT_DELETE_SELF', 'You cannot delete yourself from the team')
    }

    const memberToDelete = await pool
      .SELECT<MemberRow>`id, role`
      .FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`id = ${memberId}`
      .find({ error: 'Member not found' })

    if (memberToDelete.role === 'owner') {
      throw createAppHttpError(400, 'CANNOT_DELETE_OWNER', 'You cannot delete a team owner')
    }

    await pool
      .DELETE_FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`id = ${memberId}`

    res.status(204).end()
  }
}
