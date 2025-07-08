export type GetBoardsQuery = {
  q?: string
}

export type GetBoardsResultData = {
  id: string
  teamId: string
  createDate: string
  updateDate: string
  title?: string | null
  author?: {
    id: string
    name: string
  } | null
}

export type GetBoardsResult = {
  data: GetBoardsResultData[]
}
