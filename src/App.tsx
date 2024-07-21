import './index.css'
import { Layout } from './components/Layout'
import { useState } from 'react'
import { BoardController, BoardState } from './lib'

function App () {
  const [boardState] = useState(new BoardState())
  const boardController = new BoardController(boardState)

  return (
    <Layout
      boardState={boardState}
      boardController={boardController}
    />
  )
}

export default App
