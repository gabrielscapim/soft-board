export type SignInCommand = {
  email: string
  password: string
}

export type SignInResult = {
  userId: string
  name: string
  fallbackTeamSlug: string | null
}
