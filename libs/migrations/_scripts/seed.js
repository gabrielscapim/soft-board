require('dotenv').config()
const { Client } = require('pg')
const { randomUUID } = require('crypto')

// Password: abc123456
const users = [
  {
    id: randomUUID(),
    name: 'Batman',
    email: 'batman@email.com',
    normalized_email: 'BATMAN@EMAIL.COM',
    password_hash: '$2a$12$6qXo0IuAfOYxcRBP3gkUwuks2R.skxh5ktaRlo2py9OoBx3kz/ere'
  },
  {
    id: randomUUID(),
    name: 'Robin',
    email: 'robin@email.com',
    normalized_email: 'ROBIN@EMAIL.COM',
    password_hash: '$2a$12$6qXo0IuAfOYxcRBP3gkUwuks2R.skxh5ktaRlo2py9OoBx3kz/ere'
  }
]

const workspaces = [
  {
    id: randomUUID(),
    name: 'Batcave',
    slug: 'batcave'
  },
  {
    id: randomUUID(),
    name: 'Gotham City',
    slug: 'gotham-city'
  }
]

const members = [
  {
    id: randomUUID(),
    user_id: users[0].id,
    workspace_id: workspaces[0].id,
    role: 'owner'
  },
  {
    id: randomUUID(),
    user_id: users[1].id,
    workspace_id: workspaces[0].id,
    role: 'admin'
  },
  {
    id: randomUUID(),
    user_id: users[1].id,
    workspace_id: workspaces[1].id,
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
    }

    for (const workspace of workspaces) {
      await client.query(
        `INSERT INTO workspace (id, name, slug)
         VALUES ($1, $2, $3)`,
        [workspace.id, workspace.name, workspace.slug]
      )
    }

    for (const member of members) {
      await client.query(
        `INSERT INTO member (id, user_id, workspace_id, role)
         VALUES ($1, $2, $3, $4)`,
        [member.id, member.user_id, member.workspace_id, member.role]
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
