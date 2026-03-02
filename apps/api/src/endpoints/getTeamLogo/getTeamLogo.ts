import { RequestHandler } from 'express'
import { getPool } from '../../libs'
import { TeamDatabase } from 'types/database'
import stream from 'stream'

export const method = 'get'

export const auth = false

export function handler (): RequestHandler {
  return async (req, res) => {
    const teamId = req.query.teamId as string
    const userId = req.auth?.userId

    const pool = getPool()

    const team = await pool
      .SELECT<Pick<TeamDatabase, 'logo' | 'logoMimeType'>>`logo, logo_mime_type as "logoMimeType"`
      .FROM`team`
      .WHERE`id = ${teamId}`
      .AND`EXISTS (SELECT * FROM member WHERE member.team_id = team.id AND member.user_id = ${userId})`
      .first()

    if (!team?.logo || !team.logoMimeType) {
      res.status(204).end()
      return
    }

    const buffer = Buffer.isBuffer(team.logo) ? team.logo : Buffer.from(team.logo)

    const readStream = new stream.PassThrough()
    readStream.end(buffer)

    res.set('Content-Disposition', `attachment; filename=logo${extensionFromMime(team.logoMimeType)}`)
    res.set('Content-Type', team.logoMimeType)

    readStream.pipe(res)
  }
}

function extensionFromMime (mime: string): string {
  const map: Record<string, string> = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/svg+xml': '.svg'
  }

  return map[mime] ?? ''
}
