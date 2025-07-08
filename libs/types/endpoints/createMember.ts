export type CreateMemberCommand = {
  userId: string
  role: 'member' | 'admin'
}

export type CreateMemberResult = {
  id: string
}
