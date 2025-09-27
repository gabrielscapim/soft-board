import { DatabasePool } from 'pg-script'
import { getPool } from './get-pool'
import { MemberDatabase, UserDatabase, TeamDatabase, BoardDatabase, MessageDatabase, RequirementDatabase, ComponentDatabase, BoardGenerationDatabase } from 'types/database'
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
      image: board.image ?? null,
      teamId: board.teamId ?? randomUUID(),
      title: board.title ?? randomUUID(),
      step: board.step ?? 'init',
      status: board.status ?? 'idle',
      authorId: board.authorId ?? null,
      createDate: board.createDate ?? now,
      updateDate: board.updateDate ?? now
    }

    await this.pool.INSERT_INTO`board`.VALUES(created)

    return created
  }

  async createBoardGeneration (boardGeneration: Partial<BoardGenerationDatabase> = {}): Promise<BoardGenerationDatabase> {
    const now = new Date()
    const created: BoardGenerationDatabase = {
      id: boardGeneration.id ?? randomUUID(),
      teamId: boardGeneration.teamId ?? randomUUID(),
      boardId: boardGeneration.boardId ?? randomUUID(),
      messageId: boardGeneration.messageId ?? randomUUID(),
      status: boardGeneration.status ?? 'pending',
      error: boardGeneration.error ?? null,
      promptTokens: boardGeneration.promptTokens ?? null,
      completionTokens: boardGeneration.completionTokens ?? null,
      totalTokens: boardGeneration.totalTokens ?? null,
      exectionTimeMs: boardGeneration.exectionTimeMs ?? null,
      generationDate: boardGeneration.generationDate ?? null,
      createDate: boardGeneration.createDate ?? now,
      updateDate: boardGeneration.updateDate ?? now
    }

    await this.pool.INSERT_INTO`board_generation`.VALUES(created)

    return created
  }

  async createComponent (component: Partial<ComponentDatabase> = {}): Promise<ComponentDatabase> {
    const now = new Date()
    const created: ComponentDatabase = {
      id: component.id ?? randomUUID(),
      name: component.name ?? randomUUID(),
      teamId: component.teamId ?? randomUUID(),
      boardId: component.boardId ?? randomUUID(),
      deleted: component.deleted ?? false,
      type: component.type ?? 'button',
      properties: component.properties ?? {},
      connectionId: component.connectionId ?? null,
      screenId: component.screenId ?? null,
      boardGenerationId: component.boardGenerationId ?? null,
      createDate: component.createDate ?? now,
      updateDate: component.updateDate ?? now
    }

    await this.pool.INSERT_INTO`component`.VALUES(created)

    return created
  }

  async createMember (member: Partial<MemberDatabase> = {}): Promise<MemberDatabase> {
    const now = new Date()
    const created: MemberDatabase = {
      id: member.id ?? randomUUID(),
      userId: member.userId ?? randomUUID(),
      teamId: member.teamId ?? randomUUID(),
      role: member.role ?? 'owner',
      createDate: member.createDate ?? now,
      updateDate: member.updateDate ?? now
    }

    await this.pool.INSERT_INTO`member`.VALUES(created)

    return created
  }

  async createMessage (message: Partial<MessageDatabase> = {}): Promise<MessageDatabase> {
    const now = new Date()
    const created: MessageDatabase = {
      id: message.id ?? randomUUID(),
      teamId: message.teamId ?? randomUUID(),
      boardId: message.boardId ?? randomUUID(),
      authorId: message.authorId ?? null,
      content: message.content ?? null,
      role: message.role ?? 'user',
      toolCallId: message.toolCallId ?? null,
      toolCalls: message.toolCalls ?? null,
      sendDate: message.sendDate ?? now,
      createDate: message.createDate ?? now,
      updateDate: message.updateDate ?? now,
      type: 'text',
      error: null,
      executionTimeMs: null
    }

    await this.pool.INSERT_INTO`message`.VALUES(created)

    return created
  }

  async createRequirement (requirement: Partial<RequirementDatabase> = {}): Promise<RequirementDatabase> {
    const now = new Date()
    const created: RequirementDatabase = {
      id: requirement.id ?? randomUUID(),
      teamId: requirement.teamId ?? randomUUID(),
      boardId: requirement.boardId ?? randomUUID(),
      authorId: requirement.authorId ?? null,
      title: requirement.title ?? null,
      description: requirement.description ?? null,
      order: requirement.order ?? 0,
      createDate: requirement.createDate ?? now,
      updateDate: requirement.updateDate ?? now
    }

    await this.pool.INSERT_INTO`requirement`.VALUES(created)

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
