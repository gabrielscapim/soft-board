import { Navigate, Route, Routes } from 'react-router'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  AuthenticationGuardLayout,
  BoardWizardLayout,
  EditBoardLayout,
  PreviewModeLayout,
  RootLayout,
  UnauthenticatedGuardLayout
} from './components'
import {
  BoardReviewRoute,
  ErrorRoute,
  SignInRoute,
  BoardsRoute,
  MembersRoute,
  SettingsRoute,
  BoardWizardRoute,
  EditBoardRoute,
  PreviewModeRoute,
  SharedBoardRoute
} from './routes'
import { Toaster } from 'sonner'
import {
  AuthenticationProvider,
  AuthorizationProvider,
  BoardProvider,
  ClientProvider,
  SocketProvider,
  TeamProvider
} from './contexts'
import { Client } from './client'

const client = new Client()
const queryClient = new QueryClient()

function App () {
  const PrivateRoutesProviders = ({ children }: { children: React.ReactNode }) => (
    <TeamProvider>
      <AuthorizationProvider>
        {children}
      </AuthorizationProvider>
    </TeamProvider>
  )

  const BoardProviders = ({ children }: { children: React.ReactNode }) => (
    <PrivateRoutesProviders>
      <BoardProvider>{children}</BoardProvider>
    </PrivateRoutesProviders>
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ClientProvider client={client}>
        <AuthenticationProvider>
          <SocketProvider>
            <Toaster />
            <div className="bg-muted">
              <Routes>

                {/* Public Routes */}
                <Route path="/" element={<UnauthenticatedGuardLayout />}>
                  <Route index element={<SignInRoute />} />
                  <Route path="sign-in" element={<SignInRoute />} />
                </Route>
                <Route path="share/:token" element={<SharedBoardRoute />} />

                {/* Private Routes */}
                <Route path=":teamSlug" element={<AuthenticationGuardLayout />}>
                  <Route
                    element={
                      <PrivateRoutesProviders>
                        <RootLayout />
                      </PrivateRoutesProviders>
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
                      <BoardProviders>
                        <BoardWizardLayout />
                      </BoardProviders>
                    }
                  >
                    <Route index element={<BoardWizardRoute />} />
                  </Route>

                  <Route
                    path="boards/:boardId/edit"
                    element={
                      <BoardProviders>
                        <EditBoardLayout />
                      </BoardProviders>
                    }
                  >
                    <Route index element={<EditBoardRoute />} />
                  </Route>

                  <Route
                    path="boards/:boardId/preview"
                    element={
                      <BoardProviders>
                        <PreviewModeLayout />
                      </BoardProviders>
                    }
                  >
                    <Route index element={<PreviewModeRoute />} />
                  </Route>

                  <Route
                    path="boards/:boardId/review"
                    element={
                      <BoardProviders>
                        <BoardReviewRoute />
                      </BoardProviders>
                    }
                  />
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
          </SocketProvider>
        </AuthenticationProvider>
      </ClientProvider>
    </QueryClientProvider>
  )
}

export default App
