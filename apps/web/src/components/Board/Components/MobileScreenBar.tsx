import { MobileScreenFlexComponent } from '@/types'
import { HomeIcon } from 'lucide-react'

export type MobileScreenBarProps = {
  screen: MobileScreenFlexComponent
}

export function MobileScreenBar (props: MobileScreenBarProps) {
  const { screen } = props

  return (
    <div
      data-screen-id={screen.id}
      className="mobile-screen-bar absolute font-light select-none rounded-sm
                p-2 flex items-center justify-center gap-1 h-8 text-sm
                text-muted-foreground cursor-move opacity-60 hover:opacity-100 hover:bg-muted"
      style={{
        top: screen.properties.y - 48,
        left: screen.properties.x,
        width: screen.properties.width - 16,
        zIndex: 10
      }}
    >
      <div className="flex items-center gap-4 w-full justify-center">
        {screen.properties.main && <HomeIcon className="shrink-0" />}
        <span className="truncate block text-center">
          {screen.name}
        </span>
      </div>
    </div>
  )
}
