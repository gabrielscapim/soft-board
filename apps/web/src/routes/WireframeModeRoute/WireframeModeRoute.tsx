import { useFlexComponents } from '@/components'
import { useBoard } from '@/hooks'
import { useEffect, useMemo, useState } from 'react'
import { MobileScreenContainer, NotFoundScreenContainer } from './components'
import { Card, CardContent } from '@/components/ui/card'
import clsx from 'clsx'
import { HomeIcon } from 'lucide-react'
import { MobileScreenFlexComponent } from '@/types'

export function WireframeModeRoute () {
  const { boardState } = useBoard()
  const flexComponents = useFlexComponents(boardState)
  const screens = useMemo(() => {
    const result = flexComponents
      .filter(component => component.type === 'mobileScreen')
      .sort((a, b) => {
        const aMain = a.properties.main ? 0 : 1
        const bMain = b.properties.main ? 0 : 1

        return aMain - bMain
      })

    return result
  }, [flexComponents])
  const [currentScreen, setCurrentScreen] = useState<MobileScreenFlexComponent | null>(() => (screens[0] ?? null))

  useEffect(() => {
    if (!currentScreen && screens.length > 0) {
      setCurrentScreen(screens[0])
    }
  }, [screens, currentScreen])

  return (
    <div className="flex justify-center items-center h-full w-full overflow-auto p-6">
      <Card className="flex w-[1000px] min-h-[600px] py-0">
        <CardContent className="flex w-full p-0">
          <div className="w-1/3 border-r p-4">
            <h3 className="font-medium mb-4 text-xs text-muted-foreground">Screens</h3>

            <ul className="space-y-2">
              {screens.map(screen => (
                <li
                  key={screen.id}
                  className={clsx(
                    'cursor-pointer p-2 rounded-md border text-sm flex items-center gap-2',
                    currentScreen?.id === screen.id ? 'bg-blue-100 border-blue-400' : 'hover:bg-sidebar-accent'
                  )}
                  onClick={() => setCurrentScreen(screen)}
                >
                  {screen.properties.main && <HomeIcon size={16} />}
                  {screen.name.trim() ? screen.name : 'Untitled Screen'}
                </li>
              ))}

              {screens.length === 0 && (
                <li className="text-sm text-muted-foreground">No screens found.</li>
              )}
            </ul>
          </div>

          <div className="w-2/3 p-6 flex justify-center items-center">
            {!currentScreen && <NotFoundScreenContainer />}
            {currentScreen && (
              <MobileScreenContainer
                currentScreen={currentScreen}
                components={flexComponents}
                onChangeScreen={setCurrentScreen}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
