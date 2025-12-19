export type GetBoardQuery = {
  boardId: string
  boardGenerationId?: string | null
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
  boardGenerationId: string | null
  screenId: string | null
  createDate: string
  updateDate: string
}

export type GetBoardResultGeneration = {
  id: string
  generationDate: string
}

export type GetBoardResult = {
  id: string
  team: GetBoardResultTeam
  title: string | null
  step: 'init' | 'requirements' | 'wireflows' | 'review' | 'end'
  status: 'idle' | 'pending' | 'error'
  image: string | null
  createDate: string
  updateDate: string
  components: GetBoardResultComponent[]
  generation: GetBoardResultGeneration | null
}
