import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { useMemo, useState } from 'react'
import { BoardPropertiesMenuTabProps } from '../BoardPropertiesMenu'
import { useFlexComponents } from '@/hooks'

export function ActionsTabContent (props: BoardPropertiesMenuTabProps) {
  const { selected, boardState } = props

  const [open, setOpen] = useState(true)
  const [value, setValue] = useState('')

  const flexComponents = useFlexComponents(boardState)

  const mobileScreens = useMemo(() => {
    return flexComponents.filter((component) => component.type === 'mobileScreen')
  }, [flexComponents])

  const isButton = selected.type === 'button'

  return (
    <>
      <div className="w-full">
        <p className="text-sm leading-none font-medium select-none">
          Connect to a screen
        </p>
        <p className="text-xs text-muted-foreground pb-3 pt-2">
          This will allow to navigate between screens in the wireframe mode.
        </p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={!isButton}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full"
            >
              {value
                ? mobileScreens.find((screen) => screen.id === value)?.name
                : 'Select a screen'}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-2xs p-0" style={{ zIndex: 200_000 }}>
            <Command>
              <CommandInput placeholder="Search screen" />
              <CommandList>
                <CommandEmpty>No screens found.</CommandEmpty>
                <CommandGroup>
                  {mobileScreens.map(screen => (
                    <CommandItem
                      key={screen.id}
                      value={screen.id}
                      onSelect={currentValue => {
                        setValue(currentValue === value ? '' : currentValue)
                        setOpen(false)
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === screen.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {screen.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {!isButton && (
          <p className="text-xs text-yellow-600 pt-2">
            Only buttons can be used to connect screens.
          </p>
        )}
      </div>
    </>

  )
}
