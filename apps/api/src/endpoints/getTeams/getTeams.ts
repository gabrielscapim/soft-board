import { RequestHandler } from 'express'
import { GetTeamsResult } from 'types/endpoints'
import { getPool } from '../../libs'
import { TeamDatabase } from 'types/database'
import { createHash } from 'crypto'
import { API_BASE_URL } from '../../constants'

type Handler = RequestHandler<unknown, GetTeamsResult>

type TeamRow = Pick<TeamDatabase, 'id' | 'name' | 'slug' | 'createDate' | 'updateDate' | 'logo'>

export function handler (): Handler {
  return async (req, res) => {
    const userId = req.auth?.userId

    const pool = getPool()

    const teams = await pool
      .SELECT<TeamRow>`
        team.id,
        team.name,
        team.slug,
        team.create_date,
        team.update_date`
      .FROM`team`
      .JOIN`member ON member.team_id = team.id`
      .WHERE`member.user_id = ${userId}`
      .ORDER_BY`team.name ASC`
      .list()

    const result: GetTeamsResult = {
      data: teams.map(team => {
        const logoUrl = team.logo
          ? new URL(
            `/getTeamLogo?teamId=${team.id}&hash=${createHash('md5').update(team.logo).digest('hex')}`,
            API_BASE_URL
          ).toString()
          : null

        return {
          id: team.id,
          name: team.name,
          slug: team.slug,
          logoUrl,
          createDate: team.createDate.toISOString(),
          updateDate: team.updateDate.toISOString()
        }
      })
    }

    res.status(200).json(result)
  }
}
