export type GetMembersQuery = {
  pageNumber?: number
  pageSize?: number
}

export type GetMembersUserResult = {
  id: string
  name: string
  email: string
}

export type GetMembersResultData = {
  id: string
  user: GetMembersUserResult
  role: 'owner' | 'admin' | 'member'
  createDate: string
  updateDate: string
}

export type GetMembersResult = {
  data: GetMembersResultData[]
  totalSize: number
  pageSize: number
  pageNumber: number
}
