export type UpdateComponentsCommand = {
  boardId: string
  components: {
    id: string
    name?: string
    properties?: Record<string, any>
    connectionId?: string | null
    screenId?: string | null
  }[]
}
