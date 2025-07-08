import { Navigate, Route, Routes } from 'react-router'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BoardContextProvider } from './contexts/BoardContext/BoardContextProvider'
import { BoardController, BoardState } from './lib'
import { useState } from 'react'
import { AuthenticationGuardLayout, RootLayout, UnauthenticatedGuardLayout } from './components'
import { ErrorRoute, RootRoute, SignInRoute, BoardsRoute } from './routes'
import { Toaster } from 'sonner'
import { AuthenticationProvider, ClientProvider, TeamProvider } from './contexts'
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

                {/* Public Routes */}
                <Route path="/" element={<UnauthenticatedGuardLayout />}>
                  <Route index element={<SignInRoute />} />
                  <Route path="sign-in" element={<SignInRoute />} />
                </Route>

                {/* Private Routes */}
                <Route path=":teamSlug" element={<AuthenticationGuardLayout />}>
                  <Route
                    element={
                      <TeamProvider>
                        <RootLayout />
                      </TeamProvider>
                    }
                  >
                    <Route index element={<Navigate to="boards" replace />} />
                    <Route path="boards" element={<BoardsRoute />} />
                    <Route path="members" element={<RootRoute />} />
                    <Route path="settings" element={<RootRoute />} />
                  </Route>
                </Route>

                <Route path="*" element={<ErrorRoute status={404} description="The page you are looking for does not exist." />} />
              </Routes>
            </div>
          </BoardContextProvider>
        </AuthenticationProvider>
      </ClientProvider>
    </QueryClientProvider>
  )
}

export default App
