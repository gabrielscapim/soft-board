import { RequestHandler } from 'express'
import { UpdateBoardCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission } from '../../libs'
import { GetApplicationDependencies } from '../../types'

type Handler = RequestHandler<unknown, unknown, UpdateBoardCommand>

const schema = yup.object({
  id: yup.string().required(),
  title: yup.string().nullable().optional().default(null)
})

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can update boards')
    const { pool } = getDeps()

    const teamId = req.team!.teamId
    const { id, title } = schema.validateSync(req.body, { abortEarly: false })

    await pool
      .UPDATE`board`
      .SET({
        title,
        updateDate: new Date()
      })
      .WHERE`id = ${id}`
      .AND`team_id = ${teamId}`

    res.status(204).end()
  }
}
