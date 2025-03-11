import { Route, Routes } from 'react-router'
import './index.css'
import { BoardRoute, WireframeModeRoute } from './routes'
import { BoardContextProvider } from './contexts/BoardContext/BoardContextProvider'
import { BoardState } from './lib'
import { useState } from 'react'

function App () {
  const [boardState] = useState(new BoardState())

  return (
    <BoardContextProvider boardState={boardState}>
      <Routes>
        <Route path="/" element={<BoardRoute />} />
        <Route path="wireframe-mode" element={<WireframeModeRoute />} />
      </Routes>
    </BoardContextProvider>
  )
}

export default App
