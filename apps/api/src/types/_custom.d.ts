import type { AuthenticationData } from './authentication-data'
import { TeamData } from './team-data'

declare global {
  namespace Express {
    interface Request {
      auth?: AuthenticationData
      team?: TeamData
    }
  }
}
