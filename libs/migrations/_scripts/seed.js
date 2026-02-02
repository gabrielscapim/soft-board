require('dotenv').config()
const { Client } = require('pg')
const { randomUUID } = require('crypto')

// Password: abc123456
const users = [
  {
    id: randomUUID(),
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    normalized_email: 'JANE.DOE@EMAIL.COM',
    password_hash: '$2a$12$6qXo0IuAfOYxcRBP3gkUwuks2R.skxh5ktaRlo2py9OoBx3kz/ere'
  },
  {
    id: randomUUID(),
    name: 'John Doe',
    email: 'john.doe@email.com',
    normalized_email: 'JOHN.DOE@EMAIL.COM',
    password_hash: '$2a$12$6qXo0IuAfOYxcRBP3gkUwuks2R.skxh5ktaRlo2py9OoBx3kz/ere'
  }
]

const teams = [
  {
    id: randomUUID(),
    name: 'Awesome Team',
    slug: 'awesome-team'
  },
  {
    id: randomUUID(),
    name: 'Designers Team',
    slug: 'designers-team'
  }
]

const members = [
  {
    id: randomUUID(),
    user_id: users[0].id,
    team_id: teams[0].id,
    role: 'owner'
  },
  {
    id: randomUUID(),
    user_id: users[1].id,
    team_id: teams[0].id,
    role: 'admin'
  },
  {
    id: randomUUID(),
    user_id: users[1].id,
    team_id: teams[1].id,
    role: 'owner'
  }
]

async function seed () {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()

  try {
    await client.query('BEGIN')

    for (const user of users) {
      await client.query(
        `INSERT INTO "user" (id, name, email, normalized_email, password_hash)
         VALUES ($1, $2, $3, $4, $5)`,
        [user.id, user.name, user.email, user.normalized_email, user.password_hash]
      )

      await client.query(
        `INSERT INTO user_preferences (user_id, language)
         VALUES ($1, $2)`,
        [user.id, 'en']
      )
    }

    for (const team of teams) {
      await client.query(
        `INSERT INTO team (id, name, slug)
         VALUES ($1, $2, $3)`,
        [team.id, team.name, team.slug]
      )
    }

    for (const member of members) {
      await client.query(
        `INSERT INTO member (id, user_id, team_id, role)
         VALUES ($1, $2, $3, $4)`,
        [member.id, member.user_id, member.team_id, member.role]
      )
    }

    await client.query('COMMIT')

    console.log('Database seeded successfully!')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    await client.end()
  }
}

seed()
