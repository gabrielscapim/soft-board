import { Outlet } from 'react-router'
import { BoardSidebar } from '../BoardSidebar'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { BoardHeader } from '../BoardHeader'

export function BoardLayout () {
  return (
    <SidebarProvider>
      <BoardSidebar />
      <SidebarInset>
        <BoardHeader />
        <main className="flex grow">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
