import { Route, Routes } from 'react-router'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BoardContextProvider } from './contexts/BoardContext/BoardContextProvider'
import { BoardController, BoardState } from './lib'
import { useState } from 'react'
import { AuthenticationGuardLayout, BoardLayout, UnauthenticatedGuardLayout, WireframeModeLayout } from './components'
import { BoardRoute, NotFoundRoute, SignInRoute, WireframeModeRoute } from './routes'
import { Toaster } from 'sonner'
import { AuthenticationProvider, ClientProvider } from './contexts'
import { Client } from './client'

const client = new Client()
const queryClient = new QueryClient()

function App () {
  const [boardState] = useState(new BoardState())
  const boardController = new BoardController(boardState)

  return (
    <QueryClientProvider client={queryClient}>
      <ClientProvider client={client}>
        <AuthenticationProvider>
          <BoardContextProvider boardState={boardState} boardController={boardController}>
            <Toaster />
            <div className="bg-muted">
              <Routes>
                {/* Unauthenticated Routes */}
                <Route path="/" element={<UnauthenticatedGuardLayout />}>
                  <Route path="/sign-in" element={<SignInRoute />} />
                </Route>

                {/* Authentication Routes */}
                <Route path="/" element={<AuthenticationGuardLayout />}>
                  <Route path="" element={<BoardLayout />}>
                    <Route index element={<BoardRoute />} />
                  </Route>

                  <Route path="wireframe-mode" element={<WireframeModeLayout />}>
                    <Route index element={<WireframeModeRoute />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFoundRoute />} />
              </Routes>
            </div>
          </BoardContextProvider>
        </AuthenticationProvider>
      </ClientProvider>
    </QueryClientProvider>
  )
}

export default App
