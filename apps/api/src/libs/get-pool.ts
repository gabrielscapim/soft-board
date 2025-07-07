import { Pool } from 'pg'
import { DatabasePool } from 'pg-script'

const CONNECTION_STRING = process.env.DATABASE_URL

export function getPool () {
  if (!CONNECTION_STRING) {
    throw new Error('DATABASE_URL is not defined')
  }

  const pool = new Pool({ connectionString: CONNECTION_STRING })
  const pg = new DatabasePool(pool)

  return pg
}
