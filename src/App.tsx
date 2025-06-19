import { Route, Routes } from 'react-router'
import './index.css'
import { BoardContextProvider } from './contexts/BoardContext/BoardContextProvider'
import { BoardController, BoardState } from './lib'
import { useState } from 'react'
import { BoardLayout, WireframeModeLayout } from './components'
import { BoardRoute, WireframeModeRoute } from './routes'

function App () {
  const [boardState] = useState(new BoardState())
  const boardController = new BoardController(boardState)

  return (
    <BoardContextProvider boardState={boardState} boardController={boardController}>
      <Routes>
        {/* Board route */}
        <Route path="/" element={<BoardLayout />}>
          <Route index element={<BoardRoute />} />
        </Route>

        {/* Wireframe mode route */}
        <Route path="wireframe-mode" element={<WireframeModeLayout />}>
          <Route index element={<WireframeModeRoute />} />
        </Route>
      </Routes>
    </BoardContextProvider>
  )
}

export default App
