export type UpdateTeamCommand = {
  name?: string
  logo?: {
    base64: string
    mimeType: string
  } | null
}

export type UpdateTeamResult = {
  newSlug?: string
}
