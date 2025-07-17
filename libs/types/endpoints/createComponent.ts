export type CreateComponentCommand = {
  boardId: string
  type: string
  properties: Record<string, any>
  id?: string | null
  connectionId?: string | null
  screenId?: string | null
}
