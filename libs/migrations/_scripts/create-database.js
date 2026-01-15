const { Client } = require('pg')

const connectionString = process.env.DATABASE_URL
const isTest = process.env.NODE_ENV === 'test'

async function createDatabase () {
  const dbName = isTest ? 'soft_board_test' : 'soft_board'
  const client = new Client({ connectionString })

  await client.connect()

  try {
    await client.query(`CREATE DATABASE ${dbName}`)
    console.log(`Database ${dbName} created successfully.`)
  } finally {
    await client.end()
  }
}

createDatabase()
