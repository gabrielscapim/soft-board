const { createHash } = require('crypto')
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

async function migrate () {
  await migrateDatabase('DATABASE_URL', 'sql')
}

async function migrateDatabase (
  envName,
  folderName
) {
  const pathname = path.join(__dirname, '..', folderName)
  const connectionString = process.env[envName]
  const migrationFiles = await fs.promises.readdir(pathname)

  const client = new Client({
    connectionString,
    ...(process.env.DISABLE_REJECT_UNAUTHORIZED === 'true' ? { ssl: { rejectUnauthorized: false } } : {})
  })
  await client.connect()

  await client.query(`
    CREATE TABLE IF NOT EXISTS __migration (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      hash TEXT NOT NULL,
      create_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  const { rows: appliedMigrations } = await client.query('SELECT name FROM __migration')
  const appliedMigrationsSet = new Set(appliedMigrations.map(row => row.name))

  let skipped = 0
  let applied = 0

  console.log(`${folderName} (${envName})`)

  for (const migrationFile of migrationFiles) {
    if (appliedMigrationsSet.has(migrationFile)) {
      skipped++
      continue
    }

    const filepath = path.join(pathname, migrationFile)
    const fileContent = await fs.promises.readFile(filepath, 'utf-8')

    try {
      const hash = createHash('sha256').update(fileContent).digest('hex')

      await client.query(fileContent)

      await client.query(
        'INSERT INTO __migration (name, hash) VALUES ($1, $2)',
        [migrationFile, hash]
      )
      applied++
      console.log(`Migration ${migrationFile} applied successfully.`)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }

  console.log(`Applied ${applied} migrations, skipped ${skipped} migrations\n`)

  await client.end()
}

migrate()
