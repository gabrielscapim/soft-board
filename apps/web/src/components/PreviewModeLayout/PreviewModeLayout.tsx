import { Outlet } from 'react-router'
import { PreviewModeHeader } from '../PreviewModeHeader'

export function PreviewModeLayout () {
  return (
    <>
      <PreviewModeHeader />
      <main className="flex grow h-[calc(100vh-60px)]">
        <Outlet />
      </main>
    </>
  )
}
