export type CreateRequirementCommand = {
  boardId: string
  title: string | null
  description: string | null
}

export type CreateRequirementResult = {
  id: string
}
