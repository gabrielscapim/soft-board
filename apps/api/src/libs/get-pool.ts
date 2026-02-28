import { Pool } from 'pg'
import { DatabasePool } from 'pg-script'
import { DATABASE_URL } from '../constants'

export function getPool () {
  const pool = new Pool({ connectionString: DATABASE_URL })
  const pg = new DatabasePool(pool)

  return pg
}
