export type UpdateComponentCommand = {
  id: string
  boardId: string
  name?: string
  properties?: Record<string, any>
  connectionId?: string | null
  screenId?: string | null
}
