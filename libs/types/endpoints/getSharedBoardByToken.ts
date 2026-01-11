export type GetSharedBoardByTokenCommand = {
  token: string
}

export type GetSharedBoardByTokenResultComponent = {
  id: string
  name: string
  type: string
  properties: Record<string, any>
  connectionId: string | null
  screenId: string | null
  createDate: string
  updateDate: string
}

export type GetSharedBoardByTokenResultRequirement = {
  id: string
  title: string | null
  description: string | null
}

export type GetSharedBoardByTokenResult = {
  board: {
    id: string
    title: string | null
    image: string | null
    step: 'init' | 'requirements' | 'wireflows' | 'review' | 'end'
    components: GetSharedBoardByTokenResultComponent[]
    requirements: GetSharedBoardByTokenResultRequirement[]
  }
}
