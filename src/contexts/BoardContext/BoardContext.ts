import { createContext } from 'react'
import { BoardState } from '../../lib'

export const BoardContext = createContext<BoardState | null>(null)
