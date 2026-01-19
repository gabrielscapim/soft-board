import { Outlet, useLocation } from 'react-router'
import { useTutorial } from '@/tutorials'
import { SidebarProvider, SidebarInset } from '@/components'
import { RootSidebar, RootHeader } from './components'

type RootTitle = 'boards' | 'members' | 'settings'

export function RootLayout () {
  const location = useLocation()
  const path = location.pathname.split('/')[2] as string | undefined
  const title = (path ? path.charAt(0) + path.slice(1) as RootTitle : undefined) ?? 'boards'
  const tutorial = useTutorial()

  return (
    <SidebarProvider width="16rem">
      <RootSidebar />
      <SidebarInset>
        <RootHeader
          title={title}
          onStartTutorial={title === 'boards' ? () => tutorial.runTutorialOnce('onboarding') : undefined}
        />
        <main className="flex grow">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
