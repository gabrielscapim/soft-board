import { RequestHandler } from 'express'
import { createHash } from 'crypto'
import { GetTeamResult } from 'types/endpoints'
import { getPool } from '../../libs'
import { TeamDatabase } from 'types/database'
import { API_BASE_URL } from '../../constants'

type Handler = RequestHandler<unknown, GetTeamResult>

type TeamRow = Pick<TeamDatabase, 'id' | 'name' | 'slug' | 'createDate' | 'updateDate' | 'logo'>

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId

    const pool = getPool()

    const team = await pool
      .SELECT<TeamRow>`id, name, slug, create_date, update_date, logo`
      .FROM`team`
      .WHERE`id = ${teamId}`
      .find({ error: 'Team not found' })

    const logoUrl = team.logo
      ? new URL(`/getTeamLogo?teamId=${team.id}&hash=${createHash('md5').update(team.logo).digest('hex')}`, API_BASE_URL).toString()
      : null

    const result: GetTeamResult = {
      id: team.id,
      name: team.name,
      slug: team.slug,
      logoUrl,
      createDate: team.createDate.toISOString(),
      updateDate: team.updateDate.toISOString()
    }

    res.status(200).json(result)
  }
}
