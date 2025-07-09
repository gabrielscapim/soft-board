export type GetAuthenticatedUserResult = {
  userId: string
  name: string
  email: string
  fallbackTeamSlug: string | null
} | null
