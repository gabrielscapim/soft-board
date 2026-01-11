export type ShareBoardCommand = {
  boardId: string
  expireDate?: string | null
}

export type ShareBoardResult = {
  link: string
}
