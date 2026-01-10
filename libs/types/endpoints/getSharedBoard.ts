export type GetSharedBoardCommand = {
  token: string
}

export type GetSharedBoardResultComponent = {
  id: string
  name: string
  type: string
  properties: Record<string, any>
  connectionId: string | null
  screenId: string | null
  createDate: string
  updateDate: string
}

export type GetSharedBoardResultRequirement = {
  id: string
  title: string | null
  description: string | null
}

export type GetSharedBoardResult = {
  board: {
    id: string
    title: string | null
    image: string | null
    step: 'init' | 'requirements' | 'wireflows' | 'review' | 'end'
    components: GetSharedBoardResultComponent[]
    requirements: GetSharedBoardResultRequirement[]
  }
}
