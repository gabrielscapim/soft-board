import { createContext } from 'react'
import { BoardState } from '../lib'

export const BoardStateContext = createContext<BoardState | null>(null)
