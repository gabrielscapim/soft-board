export type GetTeamsResultData = {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  createDate: string
  updateDate: string
}

export type GetTeamsResult = {
  data: GetTeamsResultData[]
}
