// The current team is the team the user is currently working on.
// The fallback team is the first team the user is a member of, ordered by creation date.

export type GetAuthenticatedUserResult = {
  userId: string
  name: string
  email: string
  fallbackTeam: {
    slug: string
  } | null
  preferences: {
    language: string
    acceptedTutorial: boolean | null
  }
} | null
