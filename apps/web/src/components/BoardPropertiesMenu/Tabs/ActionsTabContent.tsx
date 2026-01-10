import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { useMemo, useState } from 'react'
import { FlexComponent } from '@/types'
import { BoardState } from '@/lib'
import { useFlexComponents } from '@/components/Board/hooks'

export type ActionsTabContentProps = {
  flexComponent: FlexComponent
  boardState: BoardState
  onUpdateConnection: (value: string) => void
}

export function ActionsTabContent (props: ActionsTabContentProps) {
  const { flexComponent, boardState, onUpdateConnection } = props

  const [open, setOpen] = useState(true)

  const flexComponents = useFlexComponents(boardState)

  const mobileScreens = useMemo(() => {
    return flexComponents.filter((component) => component.type === 'mobileScreen')
  }, [flexComponents])

  const isButton = flexComponent.type === 'button'
  const isText = flexComponent.type === 'text'

  return (
    <>
      <div className="w-full">
        <p className="text-sm leading-none font-medium select-none">
          Connect to a screen
        </p>
        <p className="text-xs text-muted-foreground pb-3 pt-2">
          This will allow to navigate between screens in the preview mode.
        </p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={!isButton && !isText}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full"
            >
              <span className="truncate">
                {flexComponent.connectionId
                  ? mobileScreens.find((screen) => screen.id === flexComponent.connectionId)?.name
                  : 'Select a screen'}
              </span>
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-2xs p-0" style={{ zIndex: 200_000 }}>
            <Command>
              <CommandInput placeholder="Search screen" />
              <CommandList>
                <CommandEmpty>No screens found.</CommandEmpty>
                <CommandGroup>
                  {mobileScreens
                    .filter(screen => screen.id !== flexComponent.screenId)
                    .map(screen => (
                      <CommandItem
                        key={screen.id}
                        value={screen.id}
                        onSelect={currentValue => {
                          onUpdateConnection(currentValue)
                          setOpen(false)
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            'mr-2 h-4 w-4',
                            flexComponent.connectionId === screen.id ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        <span className="truncate">
                          {screen.name}
                        </span>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {!isButton && !isText && (
          <p className="text-xs text-yellow-600 pt-2">
            Only buttons or text components can be connected to a screen.
          </p>
        )}
      </div>
    </>

  )
}
