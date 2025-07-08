import { DatabasePool } from 'pg-script'
import { getPool } from './get-pool'
import { MemberDatabase, UserDatabase, TeamDatabase, BoardDatabase } from 'types/database'
import { randomUUID } from 'crypto'
import slugify from 'slugify'

export type DatabaseFactoryOptions = {
  pool?: DatabasePool
}

export class DatabaseFactory {
  pool: DatabasePool

  constructor (options: DatabaseFactoryOptions = {}) {
    this.pool = options.pool ?? getPool()
  }

  async createBoard (board: Partial<BoardDatabase> = {}): Promise<BoardDatabase> {
    const now = new Date()
    const created: BoardDatabase = {
      id: board.id ?? randomUUID(),
      teamId: board.teamId ?? randomUUID(),
      title: board.title ?? randomUUID(),
      authorId: board.authorId ?? null,
      createDate: board.createDate ?? now,
      updateDate: board.updateDate ?? now
    }

    await this.pool.INSERT_INTO`board`.VALUES(created)

    return created
  }

  async createMember (member: Partial<MemberDatabase> = {}): Promise<MemberDatabase> {
    const now = new Date()
    const created: MemberDatabase = {
      id: member.id ?? randomUUID(),
      userId: member.userId ?? randomUUID(),
      teamId: member.teamId ?? randomUUID(),
      role: member.role ?? 'member',
      createDate: member.createDate ?? now,
      updateDate: member.updateDate ?? now
    }

    await this.pool.INSERT_INTO`member`.VALUES(created)

    return created
  }

  async createUser (user: Partial<UserDatabase> = {}): Promise<UserDatabase> {
    const now = new Date()
    const email = user.email ?? `${randomUUID()}@example.com`
    const created: UserDatabase = {
      id: user.id ?? randomUUID(),
      name: user.name ?? randomUUID(),
      email,
      normalizedEmail: user.normalizedEmail ?? email.toUpperCase(),
      passwordHash: user.passwordHash ?? null,
      createDate: user.createDate ?? now,
      updateDate: user.updateDate ?? now
    }

    await this.pool.INSERT_INTO`"user"`.VALUES(created)

    return created
  }

  async createTeam (team: Partial<TeamDatabase> = {}): Promise<TeamDatabase> {
    const now = new Date()
    const name = team.name ?? randomUUID()
    const created: TeamDatabase = {
      id: team.id ?? randomUUID(),
      name,
      slug: team.slug ?? slugify(name, { lower: true, strict: true }),
      createDate: team.createDate ?? now,
      updateDate: team.updateDate ?? now
    }

    await this.pool.INSERT_INTO`team`.VALUES(created)

    return created
  }
}
