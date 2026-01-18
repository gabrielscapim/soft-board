import { MobileScreenSoftComponent } from '@/types'
import clsx from 'clsx'
import { HomeIcon } from 'lucide-react'

export type MobileScreenBarProps = {
  screen: MobileScreenSoftComponent
  enableDraggable?: boolean
}

export function MobileScreenBar (props: MobileScreenBarProps) {
  const { screen, enableDraggable } = props

  return (
    <div
      data-screen-id={screen.id}
      className={clsx(
        'mobile-screen-bar absolute font-light select-none rounded-sm',
        'p-2 flex items-center justify-center gap-1 h-8 text-sm',
        'text-muted-foreground opacity-60',
        enableDraggable ? 'cursor-move hover:opacity-100 hover:bg-muted' : 'cursor-default'
      )}
      style={{
        top: screen.properties.y - 48,
        left: screen.properties.x,
        width: screen.properties.width - 16,
        zIndex: 10
      }}
    >
      <div className="flex items-center gap-2 w-full justify-center">
        {screen.properties.main && <HomeIcon className="shrink-0" size={20} />}
        <span className="truncate block text-center">
          {screen.name}
        </span>
      </div>
    </div>
  )
}
