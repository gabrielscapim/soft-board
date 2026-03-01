import createError, { HttpError } from 'http-errors'

type Code =
  | 'CANNOT_CHANGE_OWNER_ROLE'
  | 'CANNOT_CHANGE_OWN_ROLE'
  | 'CANNOT_DELETE_SELF'
  | 'CANNOT_DELETE_OWNER'
  | 'CANNOT_LEAVE_AS_OWNER'
  | 'COMPONENTS_REQUIRED'
  | 'FORBIDDEN'
  | 'INVALID_BOARD_STEP'
  | 'INVALID_CREDENTIALS'
  | 'MAX_BOARDS_REACHED'
  | 'MAX_TEAMS_REACHED'
  | 'MAX_REQUIREMENTS_REACHED'
  | 'MEMBER_ALREADY_EXISTS'
  | 'PASSWORD_RESET_TOKEN_ALREADY_USED'
  | 'PASSWORD_RESET_TOKEN_EXPIRED'
  | 'PASSWORD_RESET_TOKEN_NOT_FOUND'
  | 'REQUIREMENTS_REQUIRED'
  | 'REQUIREMENTS_TITLE_REQUIRED'
  | 'SCREENS_REQUIRED'
  | 'SHARED_BOARD_EXPIRED'
  | 'TEAM_ALREADY_EXISTS'
  | 'TEAM_CONFLICT'
  | 'USER_NOT_FOUND'

export interface AppHttpError extends HttpError {
  code?: string
}

export function createAppHttpError (
  status: HttpError['status'],
  code: Code,
  message: string
): AppHttpError {
  const err = createError(status, message) as AppHttpError

  err.code = code
  err.expose = true

  return err
}
