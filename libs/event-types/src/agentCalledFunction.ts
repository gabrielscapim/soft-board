export type AgentCalledFunctionEvent = {
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
