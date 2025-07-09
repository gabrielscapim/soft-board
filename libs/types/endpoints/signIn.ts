export type SignInCommand = {
  email: string
  password: string
}

export type SignInResult = {
  userId: string
  name: string
  currentTeam: {
    role: 'member' | 'admin' | 'owner'
  } | null
  fallbackTeam: {
    slug: string
  } | null
}
