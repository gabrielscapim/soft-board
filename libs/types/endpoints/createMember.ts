export type CreateMemberCommand = {
  email: string
  role: 'member' | 'admin'
}

export type CreateMemberResult = {
  id: string
}
