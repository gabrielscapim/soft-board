import { RequestHandler } from 'express'
import { UpdateTeamCommand, UpdateTeamResult } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, createAppHttpError, getPool } from '../../libs'
import slugify from 'slugify'

type Handler = RequestHandler<unknown, UpdateTeamResult, UpdateTeamCommand>

const schema = yup.object({
  name: yup.string().trim().required('Name is required').max(100, 'Name must be at most 100 characters long')
})

export function handler (): Handler {
  return async (req, res) => {
    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can update team details')

    const teamId = req.team!.teamId
    const { name } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()
    const slug = slugify(name, { lower: true, strict: true })

    const existingTeam = await pool
      .SELECT`id`
      .FROM`team`
      .WHERE`slug = ${slug}`
      .AND`id != ${teamId}`
      .first()

    if (existingTeam) {
      throw createAppHttpError(409, 'TEAM_CONFLICT', 'A team with this name already exists.')
    }

    await pool
      .UPDATE`team`
      .SET({
        name,
        slug,
        updateDate: new Date()
      })
      .WHERE`id = ${teamId}`

    res.status(200).json({ slug })
  }
}
