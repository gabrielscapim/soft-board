import { Check, ChevronsUpDown, HomeIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components'
import { MobileScreenSoftComponent } from '@/types'
import { useState } from 'react'
import { TUTORIALS_ANCHORS } from '@/tutorials'

export type MobileScreenContainerTopBarProps = {
  currentScreen: MobileScreenSoftComponent
  screens: MobileScreenSoftComponent[]
  onChangeScreen?: (screen: MobileScreenSoftComponent) => void
}

export function MobileScreenContainerTopBar (props: MobileScreenContainerTopBarProps) {
  const { currentScreen, screens, onChangeScreen } = props

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-tutorial={TUTORIALS_ANCHORS.PreviewModeMobileScreenContainerTopBarScreenSelector}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between mb-2 bg-background/40"
        >
          <div className="flex items-center gap-2">
            {currentScreen.properties.main && <HomeIcon />}
            {currentScreen.name.trim() || 'Untitled Screen'}
          </div>

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search screen" className="h-9" />
          <CommandList>
            <CommandEmpty>No screen found.</CommandEmpty>
            <CommandGroup>
              {screens.map((screen) => (
                <CommandItem
                  key={screen.id}
                  value={screen.id}
                  onSelect={() => {
                    onChangeScreen?.(screen)
                    setOpen(false)
                  }}
                >
                  {screen.properties.main && <HomeIcon />}
                  {screen.name.trim() || 'Untitled Screen'}
                  <Check
                    className={cn(
                      'ml-auto',
                      screen.id === currentScreen.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
