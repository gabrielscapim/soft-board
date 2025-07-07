import { Route, Routes } from 'react-router'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BoardContextProvider } from './contexts/BoardContext/BoardContextProvider'
import { BoardController, BoardState } from './lib'
import { useState } from 'react'
import { BoardLayout, WireframeModeLayout } from './components'
import { BoardRoute, SignInRoute, WireframeModeRoute } from './routes'
import { Toaster } from 'sonner'
import { ClientProvider } from './contexts'
import { Client } from './client'

const client = new Client()
const queryClient = new QueryClient()

function App () {
  const [boardState] = useState(new BoardState())
  const boardController = new BoardController(boardState)

  return (
    <QueryClientProvider client={queryClient}>
      <ClientProvider client={client}>
        <BoardContextProvider boardState={boardState} boardController={boardController}>
          <Toaster />
          <Routes>
            <Route path="/sign-in" element={<SignInRoute />} />

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
      </ClientProvider>
    </QueryClientProvider>
  )
}

export default App
