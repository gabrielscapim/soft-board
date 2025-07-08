import { RequestHandler } from 'express'
import { GetTeamResult } from 'types/endpoints'
import { getPool } from '../../libs'
import { TeamDatabase } from 'types/database'

type Handler = RequestHandler<unknown, GetTeamResult>

type TeamRow = Pick<TeamDatabase, 'id' | 'name' | 'slug' | 'createDate' | 'updateDate'>

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId

    const pool = getPool()

    const team = await pool
      .SELECT<TeamRow>`id, name, slug, create_date, update_date`
      .FROM`team`
      .WHERE`id = ${teamId}`
      .find({ error: 'Team not found' })

    const result: GetTeamResult = {
      id: team.id,
      name: team.name,
      slug: team.slug,
      createDate: team.createDate.toISOString(),
      updateDate: team.updateDate.toISOString()
    }

    res.status(200).json(result)
  }
}
