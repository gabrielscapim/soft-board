import { Outlet, useLocation } from 'react-router'
import { useTutorial } from '@/tutorials'
import { SidebarProvider, SidebarInset } from '@/components'
import { RootSidebar, RootHeader } from './components'

type RootTitle = 'Boards' | 'Members' | 'Settings' | 'null'

export function RootLayout () {
  const location = useLocation()
  const path = location.pathname.split('/')[2] as string | undefined
  const title = (path ? path.charAt(0).toUpperCase() + path.slice(1) : 'null') as RootTitle
  const tutorial = useTutorial()

  return (
    <SidebarProvider width="16rem">
      <RootSidebar />
      <SidebarInset>
        <RootHeader
          title={title}
          onStartTutorial={title === 'Boards' ? () => tutorial.runTutorialOnce('onboarding') : undefined}
        />
        <main className="flex grow">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
