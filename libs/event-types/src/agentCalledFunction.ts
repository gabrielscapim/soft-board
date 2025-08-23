export type AgentCalledFunctionEvent = {
  board: {
    id: string
    step: string
    status: 'idle' | 'error' | 'pending'
  }
  team: {
    id: string
    slug: string
  }
  user: {
    id: string
  }
}
