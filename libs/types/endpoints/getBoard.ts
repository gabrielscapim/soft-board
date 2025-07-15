export type GetBoardQuery = {
  boardId: string
}

export type GetBoardResultTeam = {
  id: string
  slug: string
  name: string
}

export type GetBoardResult = {
  id: string
  team: GetBoardResultTeam
  title: string | null
  step: 'init' | 'requirements' | 'wireflows' | 'review'
  image: string | null
  createDate: string
  updateDate: string
}
