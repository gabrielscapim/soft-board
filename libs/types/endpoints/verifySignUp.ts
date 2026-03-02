export type VerifySignUpCommand = {
  code: string
}

export type VerifySignUpResult = {
  userId: string
  name: string
  email: string
  fallbackTeam: {
    slug: string
  } | null
  preferences: {
    language: string
  }
}
