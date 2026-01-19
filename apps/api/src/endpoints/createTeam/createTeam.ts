import { RequestHandler } from 'express'
import { CreateTeamCommand, CreateTeamResult } from 'types/endpoints'
import * as yup from 'yup'
import { createAppHttpError, getPool } from '../../libs'
import slugify from 'slugify'

type Handler = RequestHandler<unknown, CreateTeamResult, CreateTeamCommand>

const schema = yup.object({
  name: yup.string().trim().required('Name is required').max(100, 'Name must be at most 100 characters long')
})

const MAX_TEAMS_PER_USER = 5

export function handler (): Handler {
  return async (req, res) => {
    const userId = req.auth?.userId
    const { name } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    const slug = slugify(name, { lower: true, strict: true })

    const existingTeam = await pool
      .SELECT`id`
      .FROM`team`
      .WHERE`slug = ${slug}`
      .first()

    if (existingTeam) {
      throw createAppHttpError(409, 'TEAM_ALREADY_EXISTS', `A team with the slug "${slug}" already exists`)
    }

    const count = await pool
      .SELECT`id`
      .FROM`team`
      .JOIN`member ON member.team_id = team.id`
      .WHERE`member.user_id = ${userId}`
      .count()

    if (count >= MAX_TEAMS_PER_USER) {
      throw createAppHttpError(403, 'MAX_TEAMS_REACHED', 'The maximum number of teams for this user has been reached')
    }

    const created = await pool.transaction(async pool => {
      const { rows: [team] } = await pool
        .INSERT_INTO`team`
        .VALUES({
          name,
          slug
        })
        .RETURNING<{ id: string, slug: string }>`id, slug`

      await pool
        .INSERT_INTO`member`
        .VALUES({
          userId,
          teamId: team.id,
          role: 'owner'
        })

      return team
    })

    const result: CreateTeamResult = {
      id: created.id,
      slug: created.slug
    }

    res.status(201).json(result)
  }
}
