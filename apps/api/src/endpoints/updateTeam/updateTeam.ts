import { RequestHandler } from 'express'
import { UpdateTeamCommand, UpdateTeamResult } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, createAppHttpError, getPool } from '../../libs'
import slugify from 'slugify'
import { TeamDatabase } from 'types/database'

type Handler = RequestHandler<unknown, UpdateTeamResult, UpdateTeamCommand>

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .optional()
    .min(1, 'Name must be at least 1 character long')
    .max(100, 'Name must be at most 100 characters long'),
  logo: yup
    .object({
      base64: yup.string().required('Logo base64 data is required'),
      mimeType: yup.string().required('Logo MIME type is required')
    })
    .optional()
    .nullable()
    .default(undefined)
})

const ACCEPTED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml']
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

export function handler (): Handler {
  return async (req, res) => {
    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can update team details')

    const teamId = req.team!.teamId
    const { name: newName, logo } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    let newSlug: string | undefined

    if (newName) {
      newSlug = slugify(newName, { lower: true, strict: true })

      const existingTeam = await pool
        .SELECT<Pick<TeamDatabase, 'id'>>`id`
        .FROM`team`
        .WHERE`slug = ${newSlug}`
        .AND`id != ${teamId}`
        .first()

      if (existingTeam) {
        throw createAppHttpError(409, 'TEAM_CONFLICT', 'A team with this name already exists.')
      }
    }

    const result: UpdateTeamResult = {
      newSlug
    }

    if (logo) {
      assertLogoBase64(logo.base64, logo.mimeType)
    }

    await pool
      .UPDATE`team`
      .SET({
        ...(newSlug ? { slug: newSlug } : {}),
        ...(newName ? { name: newName } : {}),
        ...(logo ? { logo: base64ToBytea(logo.base64), logo_mime_type: logo.mimeType } : {}),
        ...(logo === null ? { logo: null, logo_mime_type: null } : {})
      })
      .WHERE`id = ${teamId}`

    res.status(200).json(result)
  }
}

function base64ToBytea (base64: string): Buffer {
  const match = base64.match(/^data:[^;]+;base64,(.+)$/)
  const data = match ? match[1] : base64

  return Buffer.from(data, 'base64')
}

function assertLogoBase64 (value: string, inputMimeType: string): void {
  if (!value) return

  const match = value.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9+.-]+);base64,(.+)$/)

  if (!match) {
    throw createAppHttpError(422, 'INVALID_TEAM_LOGO', 'Logo must be a valid base64 encoded image.')
  }

  const [, mimeType, data] = match

  if (!ACCEPTED_MIME_TYPES.includes(mimeType)) {
    throw createAppHttpError(422, 'INVALID_TEAM_LOGO', 'Logo must be a PNG, JPG or SVG image.')
  }

  const buffer = Buffer.from(data, 'base64')

  if (buffer.byteLength > MAX_FILE_SIZE) {
    throw createAppHttpError(422, 'INVALID_TEAM_LOGO', 'Logo must be at most 2MB.')
  }

  if (mimeType !== inputMimeType) {
    throw createAppHttpError(422, 'INVALID_TEAM_LOGO', 'MIME type in data URL does not match the provided MIME type.')
  }
}

