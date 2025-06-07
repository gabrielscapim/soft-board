import { Route, Routes } from 'react-router'
import './index.css'
import { BoardContextProvider } from './contexts/BoardContext/BoardContextProvider'
import { BoardController, BoardState } from './lib'
import { useState } from 'react'
import { Layout } from './components'

function App () {
  const [boardState] = useState(new BoardState())
  const boardController = new BoardController(boardState)

  return (
    <BoardContextProvider boardState={boardState} boardController={boardController}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<BoardRoute />} />
          <Route path="wireframe-mode" element={<WireframeModeRoute />} /> */}
        </Route>
      </Routes>
    </BoardContextProvider>
  )
}

export default App
