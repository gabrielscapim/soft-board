import { Navigate, Route, Routes } from 'react-router'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  AuthenticationGuardLayout,
  BoardLayout,
  BoardWizardLayout,
  RootLayout,
  UnauthenticatedGuardLayout
} from './components'
import {
  ErrorRoute,
  SignInRoute,
  BoardsRoute,
  MembersRoute,
  SettingsRoute,
  BoardWizardRoute,
  BoardRoute
} from './routes'
import { Toaster } from 'sonner'
import {
  AuthenticationProvider,
  AuthorizationProvider,
  BoardContextProvider,
  ClientProvider,
  TeamProvider
} from './contexts'
import { Client } from './client'

const client = new Client()
const queryClient = new QueryClient()

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientProvider client={client}>
        <AuthenticationProvider>
          <Toaster />
          <div className="bg-muted">
            <Routes>

              {/* Public Routes */}
              <Route path="/" element={<UnauthenticatedGuardLayout />}>
                <Route index element={<SignInRoute />} />
                <Route path="sign-in" element={<SignInRoute />} />
              </Route>

              <Route path="/board-test" element={<BoardLayout />}>
                <Route index element={<BoardRoute />} />
              </Route>

              {/* Private Routes */}
              <Route path=":teamSlug" element={<AuthenticationGuardLayout />}>
                <Route
                  element={
                    <TeamProvider>
                      <AuthorizationProvider>
                        <RootLayout />
                      </AuthorizationProvider>
                    </TeamProvider>
                  }
                >
                  <Route index element={<Navigate to="boards" replace />} />
                  <Route path="boards" element={<BoardsRoute />} />
                  <Route path="members" element={<MembersRoute />} />
                  <Route path="settings" element={<SettingsRoute />} />
                </Route>

                <Route
                  path="boards/:boardId"
                  element={
                    <TeamProvider>
                      <AuthorizationProvider>
                        <BoardContextProvider>
                          <BoardWizardLayout />
                        </BoardContextProvider>
                      </AuthorizationProvider>
                    </TeamProvider>
                  }
                >
                  <Route index element={<BoardWizardRoute />} />
                </Route>
              </Route>

              <Route
                path="*"
                element={
                  <ErrorRoute
                    status={404}
                    description="The page you are looking for does not exist."
                  />
                }
              />
            </Routes>
          </div>
        </AuthenticationProvider>
      </ClientProvider>
    </QueryClientProvider>
  )
}

export default App
