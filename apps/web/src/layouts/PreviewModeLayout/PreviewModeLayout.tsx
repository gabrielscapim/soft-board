import { Outlet } from 'react-router'
import { PreviewModeHeader } from './components'

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
