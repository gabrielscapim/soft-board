export type CreateBoardCommand = {
  title?: string | null
}

export type CreateBoardResult = {
  id: string
  teamId: string
}
