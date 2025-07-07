import type { AuthenticationData } from './authentication-data'

declare global {
  namespace Express {
    interface Request {
      auth?: AuthenticationData
    }
  }
}
