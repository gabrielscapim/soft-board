export type GetBoardQuery = {
  boardId: string
}

export type GetBoardResultTeam = {
  id: string
  slug: string
  name: string
}

export type GetBoardResultComponent = {
  id: string
  name: string
  type: string
  properties: Record<string, any>
  connectionId: string | null
  screenId: string | null
  createDate: string
  updateDate: string
}

export type GetBoardResult = {
  id: string
  team: GetBoardResultTeam
  title: string | null
  step: 'init' | 'requirements' | 'wireflows' | 'review'
  image: string | null
  createDate: string
  updateDate: string
  components: GetBoardResultComponent[]
}
