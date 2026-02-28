import { Pool } from 'pg'
import { DatabasePool } from 'pg-script'
import { DATABASE_URL, DISABLE_REJECT_UNAUTHORIZED } from '../constants'

let pg: DatabasePool | null = null

export function getPool () {
  if (pg) {
    return pg
  }

  const pool = new Pool({
    connectionString: DATABASE_URL,
    ...(DISABLE_REJECT_UNAUTHORIZED ? { ssl: { rejectUnauthorized: false } } : {})
  })

  pg = new DatabasePool(pool)

  return pg
}
