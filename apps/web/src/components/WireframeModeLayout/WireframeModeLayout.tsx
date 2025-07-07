import { Outlet } from 'react-router'
import { WireframeModeHeader } from '../WireframeModeHeader'

export function WireframeModeLayout () {
  return (
    <>
      <WireframeModeHeader />
      <main className="flex grow">
        <Outlet />
      </main>
    </>
  )
}
