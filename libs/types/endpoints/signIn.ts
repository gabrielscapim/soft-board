export type SignInCommand = {
  email: string
  password: string
}

export type SignInResult = {
  userId: string
  name: string
  fallbackTeam: {
    slug: string
  } | null
  preferences: {
    language: string
  }
}
