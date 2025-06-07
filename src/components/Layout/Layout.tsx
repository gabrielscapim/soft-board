import { Outlet } from 'react-router'
import { BoardSidebar } from '../BoardSidebar'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { BoardHeader } from '../BoardHeader'

export function Layout () {
  return (
    <SidebarProvider>
      <BoardSidebar />
      <SidebarInset>
        <BoardHeader />
        <main>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
