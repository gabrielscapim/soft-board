import { RequestHandler } from 'express'
import { UpdateBoardStepCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, UpdateBoardStepCommand>

const schema = yup.object({
  id: yup.string().required(),
  step: yup.string().required()
})

export function handler (): Handler {
  return async (req, res) => {
    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can update board steps')

    const teamId = req.team!.teamId
    const { id, step } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    await pool
      .UPDATE`board`
      .SET({
        step,
        updateDate: new Date()
      })
      .WHERE`id = ${id}`
      .AND`team_id = ${teamId}`

    res.status(204).end()
  }
}
