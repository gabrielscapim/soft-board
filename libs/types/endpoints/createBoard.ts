export type CreateBoardCommand = {
  language?: 'en' | 'pt-BR'
  title?: string | null
}

export type CreateBoardResult = {
  id: string
  teamId: string
}
