export type AgentCalledFunctionEvent = {
  toolCall: {
    id: string
  }
  board: {
    id: string
    step: string
  }
  team: {
    id: string
    slug: string
  }
  user: {
    id: string
  }
}
