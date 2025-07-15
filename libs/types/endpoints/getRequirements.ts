export type GetRequirementsQuery = {
  boardId: string
}

export type GetRequirementsResultAuthor = {
  userId: string
  name: string
}

export type GetRequirementsResultData = {
  id: string
  teamId: string
  boardId: string
  author: GetRequirementsResultAuthor | null
  title: string | null
  description: string | null
  order: number
  createDate: string
  updateDate: string
}

export type GetRequirementsResult = {
  data: GetRequirementsResultData[]
}
