import { Outlet } from 'react-router'
import { RootSidebar } from '../RootSidebar'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'

export function RootLayout () {
  return (
    <SidebarProvider width="16rem">
      <RootSidebar />
      <SidebarInset>
        <main className="flex grow">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
