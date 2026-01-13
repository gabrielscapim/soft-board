import { RequestHandler } from 'express'
import { UpdateBoardStepCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, getPool } from '../../libs'
import { BadRequest } from 'http-errors'
import { DatabasePool } from 'pg-script'
import { RequirementDatabase } from 'types/database'

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

    const currentStep = board.step

    const nextStep = step === 'next'
      ? STEPS_ORDER[STEPS_ORDER.indexOf(currentStep) + 1]
      : STEPS_ORDER[STEPS_ORDER.indexOf(currentStep) - 1]

    if (!nextStep) {
      throw new BadRequest(`Cannot go ${step} from step ${currentStep}`)
    }

    // If moving from requirements to wireflows, ensure at least 1 requirement exists
    if (currentStep === 'requirements' && nextStep === 'wireflows') {
      await validateRequirements(pool, id)
    }

    // If moving from wireflows to review, ensure at least 1 screen and 1 component exist
    if (currentStep === 'wireflows' && nextStep === 'review') {
      await validateScreens(pool, id)
    }

    await pool
      .UPDATE`board`
      .SET({
        step: nextStep,
        updateDate: new Date()
      })
      .WHERE`id = ${id}`
      .AND`team_id = ${teamId}`

    res.status(204).end()
  }
}

async function validateRequirements (
  pool: DatabasePool,
  boardId: string
): Promise<void> {
  const requirements = await pool
    .SELECT<Pick<RequirementDatabase, 'id' | 'title'>>`id, title`
    .FROM`requirement`
    .WHERE`board_id = ${boardId}`
    .list()

  const count = requirements.length

  if (count < 1) {
    throw new BadRequest('Cannot move to wireflows step without at least 1 requirement.')
  }

  if (requirements.some(r => !r.title)) {
    throw new BadRequest('All requirements must have a title before moving to wireflows step.')
  }
}

async function validateScreens (
  pool: DatabasePool,
  boardId: string
) {
  const screen = await pool
    .SELECT`id`
    .FROM`component`
    .WHERE`board_id = ${boardId}`
    .AND`type = 'mobileScreen'`
    .first()

  const component = await pool
    .SELECT`id`
    .FROM`component`
    .WHERE`board_id = ${boardId}`
    .AND`type != 'mobileScreen'`
    .first()

  if (!screen) {
    throw new BadRequest('Cannot move to review step without at least 1 screen.')
  }

  if (!component) {
    throw new BadRequest('Cannot move to review step without at least 1 component.')
  }
}
