import { DatabasePool } from 'pg-script'
import { getPool } from './get-pool'
import { MemberDatabase, UserDatabase, WorkspaceDatabase } from 'types/database'
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

  async createMember (member: Partial<MemberDatabase> = {}): Promise<MemberDatabase> {
    const now = new Date()
    const created: MemberDatabase = {
      id: member.id ?? randomUUID(),
      userId: member.userId ?? randomUUID(),
      workspaceId: member.workspaceId ?? randomUUID(),
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

  async createWorkspace (workspace: Partial<WorkspaceDatabase> = {}): Promise<WorkspaceDatabase> {
    const now = new Date()
    const name = workspace.name ?? randomUUID()
    const created: WorkspaceDatabase = {
      id: workspace.id ?? randomUUID(),
      name,
      slug: workspace.slug ?? slugify(name, { lower: true, strict: true }),
      createDate: workspace.createDate ?? now,
      updateDate: workspace.updateDate ?? now
    }

    await this.pool.INSERT_INTO`workspace`.VALUES(created)

    return created
  }
}
