import { Pool } from 'pg'
import { DatabasePool } from 'pg-script'
import { DATABASE_URL, DISABLE_REJECT_UNAUTHORIZED } from '../constants'

export function getPool () {
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ...(DISABLE_REJECT_UNAUTHORIZED ? { ssl: { rejectUnauthorized: false } } : {})
  })
  const pg = new DatabasePool(pool)

  return pg
}
