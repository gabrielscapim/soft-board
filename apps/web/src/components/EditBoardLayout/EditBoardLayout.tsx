import { Outlet } from 'react-router'
import { EditBoardSidebar } from '../EditBoardSidebar'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { EditBoardHeader } from '../EditBoardHeader'

export function EditBoardLayout () {
  return (
    <SidebarProvider>
      <EditBoardSidebar />
      <SidebarInset>
        <EditBoardHeader />
        <main className="flex grow">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
