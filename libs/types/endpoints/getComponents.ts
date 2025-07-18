export type GetComponentsQuery = {
  boardId: string
}

export type GetComponentsResultData = {
  id: string
  name: string
  type: string
  properties: Record<string, any>
  connectionId: string | null
  screenId: string | null
  createDate: string
  updateDate: string
}

export type GetComponentsResult = {
  data: GetComponentsResultData[]
}
