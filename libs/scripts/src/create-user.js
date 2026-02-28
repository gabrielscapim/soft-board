require('dotenv').config()
const { Client } = require('pg')
const { randomUUID } = require('crypto')
const bcrypt = require('bcrypt')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve))

async function createUser () {
  const name = await question('Name: ')
  const email = await question('Email: ')
  const password = await question('Password: ')
  const teamName = await question('Team name: ')
  rl.close()

  const passwordHash = await bcrypt.hash(password, 12)
  const teamSlug = teamName.toLowerCase().replace(/\s+/g, '-')

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ...(process.env.DISABLE_REJECT_UNAUTHORIZED === 'true' ? { ssl: { rejectUnauthorized: false } } : {})
  })
  await client.connect()

  try {
    await client.query('BEGIN')

    const userId = randomUUID()
    const teamId = randomUUID()

    await client.query(
      `INSERT INTO "user" (id, name, email, normalized_email, password_hash)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, name, email, email.toUpperCase(), passwordHash]
    )

    await client.query(
      `INSERT INTO user_preferences (user_id, language) VALUES ($1, $2)`,
      [userId, 'en']
    )

    await client.query(
      `INSERT INTO team (id, name, slug) VALUES ($1, $2, $3)`,
      [teamId, teamName, teamSlug]
    )

    await client.query(
      `INSERT INTO member (id, user_id, team_id, role) VALUES ($1, $2, $3, $4)`,
      [randomUUID(), userId, teamId, 'owner']
    )

    await client.query('COMMIT')

    console.log(`\nUser created successfully!`)
    console.log(`User id: ${userId}`)
    console.log(`Team id: ${teamId}`)
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    await client.end()
  }
}

createUser()
