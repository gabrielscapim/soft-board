export type GetMessagesQuery = {
  boardId: string
}

export type GetMessagesResultAuthor = {
  userId: string
  name: string
}

export type GetMessagesResultBoardGeneration = {
  id: string
  status: 'pending' | 'error' | 'completed'
  generationDate: string | null
  createDate: string
  updateDate: string
}

export type GetMessagesResultBoardReviewReviewKey =
  | 'startflowCriterion1'
  | 'startflowCriterion2'
  | 'startflowCriterion3'
  | 'startflowCriterion4'
  | 'nielsenHeuristic2'
  | 'nielsenHeuristic4'
  | 'nielsenHeuristic4'
  | 'nielsenHeuristic6'
  | 'nielsenHeuristic8'

export type GetMessagesResultBoardReview = {
  id: string
  status: 'pending' | 'error' | 'completed'
  review: {
    key: GetMessagesResultBoardReviewReviewKey
    title: string
    description: string
    applicable: boolean
    explanation: string
    score?: number
    suggestions?: string[]
    notApplicableReason?: string
  }[]
  score: number | null
  reviewDate: string | null
  createDate: string
  updateDate: string
}

export type GetMessagesResultData = {
  id: string
  boardId: string
  author: GetMessagesResultAuthor | null
  content: string | null
  role: 'assistant' | 'user' | 'tool' | 'system'
  toolCallId: string | null
  toolCalled: boolean
  boardGeneration: GetMessagesResultBoardGeneration | null
  boardReview: GetMessagesResultBoardReview | null
  sendDate: string
  createDate: string
  updateDate: string
}

export type GetMessagesResult = {
  data: GetMessagesResultData[]
}
