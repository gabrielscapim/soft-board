import { useContext } from 'react'
import { BoardContext } from '../contexts'

export function useBoardContext () {
  const context = useContext(BoardContext)

  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider')
  }

  return context
}
