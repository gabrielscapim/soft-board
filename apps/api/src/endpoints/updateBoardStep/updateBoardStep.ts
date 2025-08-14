import { RequestHandler } from 'express'
import { UpdateBoardStepCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, getPool } from '../../libs'
import { BadRequest } from 'http-errors'

type Handler = RequestHandler<unknown, unknown, UpdateBoardStepCommand>

const schema = yup.object({
  id: yup.string().required(),
  step: yup.string().oneOf(['next', 'previous']).required()
})

const STEPS_ORDER = ['init', 'requirements', 'wireflows', 'review', 'end']

export function handler (): Handler {
  return async (req, res) => {
    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can update board steps')

    const teamId = req.team!.teamId
    const { id, step } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    const board = await pool
      .SELECT<{ step: string }>`step`
      .FROM`board`
      .WHERE`id = ${id}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board with id ${id} not found in team ${teamId}` })

    const boardStep = step === 'next'
      ? STEPS_ORDER[STEPS_ORDER.indexOf(board.step) + 1]
      : STEPS_ORDER[STEPS_ORDER.indexOf(board.step) - 1]

    if (!boardStep) {
      throw new BadRequest(`Cannot go ${step} from step ${board.step}`)
    }

    await pool
      .UPDATE`board`
      .SET({
        step: boardStep,
        updateDate: new Date()
      })
      .WHERE`id = ${id}`
      .AND`team_id = ${teamId}`

    res.status(204).end()
  }
}
