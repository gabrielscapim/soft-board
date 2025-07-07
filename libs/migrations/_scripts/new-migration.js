const fs = require('fs')
const path = require('path')

function newMigration () {
  const filename = Math.floor(Date.now() / 1000) + ':' + 'MIGRATION.sql'
  const pathname = path.join(__dirname, '..', 'sql', filename)

  fs.writeFileSync(
    pathname,
    '-- New migration\n',
    'utf-8'
  )

  console.log(`Migration file created at ${pathname}`)
}

newMigration()
