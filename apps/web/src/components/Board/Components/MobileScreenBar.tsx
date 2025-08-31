import { MobileScreenFlexComponent } from '@/types'
import { SmartphoneIcon } from 'lucide-react'

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
      <SmartphoneIcon size={16} />
      {screen.name}
    </div>
  )
}
