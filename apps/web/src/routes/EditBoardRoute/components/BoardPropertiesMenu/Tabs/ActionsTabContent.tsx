import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
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
  PopoverTrigger,
  useBoardStore
} from '@/components'

import { useMemo, useState } from 'react'
import { SoftComponent } from '@/types'
import { BoardState } from '@/lib'
import { useTranslation } from 'react-i18next'

export type ActionsTabContentProps = {
  softComponent: SoftComponent
  boardState: BoardState
  onUpdateConnection: (value: string) => void
}

export function ActionsTabContent (props: ActionsTabContentProps) {
  const { softComponent, boardState, onUpdateConnection } = props

  const { t } = useTranslation('routes.editBoard')
  const [open, setOpen] = useState(true)

  const softComponents = useBoardStore(boardState, 'softComponentsChanged', state => state.softComponents)

  const mobileScreens = useMemo(() => {
    return softComponents.filter((component) => component.type === 'mobileScreen')
  }, [softComponents])

  const isButton = softComponent.type === 'button'
  const isText = softComponent.type === 'text'
  const isInsideScreen = Boolean(softComponent.screenId)

  return (
    <>
      <div className="w-full">
        <p className="text-sm leading-none font-medium select-none">
          {t('actionsTab.title')}
        </p>
        <p className="text-xs text-muted-foreground pb-3 pt-2">
          {t('actionsTab.description')}
        </p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={!isButton && !isText || !isInsideScreen}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full"
            >
              <span className="truncate">
                {softComponent.connectionId
                  ? mobileScreens.find((screen) => screen.id === softComponent.connectionId)?.name
                  : t('actionsTab.emptyScreens')}
              </span>
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-2xs p-0" style={{ zIndex: 200_000 }}>
            <Command>
              <CommandInput placeholder={t('actionsTab.searchScreen')} />
              <CommandList>
                <CommandEmpty>{t('actionsTab.emptyScreens')}</CommandEmpty>
                <CommandGroup>
                  {mobileScreens
                    .filter(screen => screen.id !== softComponent.screenId)
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
                            softComponent.connectionId === screen.id ? 'opacity-100' : 'opacity-0'
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
            {t('actionsTab.helperText.onlyButtonsAndText')}
          </p>
        )}

        {(isButton || isText) && !isInsideScreen && (
          <p className="text-xs text-yellow-600 pt-2">
            {t('actionsTab.helperText.onlyInsideScreen')}
          </p>
        )}
      </div>
    </>

  )
}
