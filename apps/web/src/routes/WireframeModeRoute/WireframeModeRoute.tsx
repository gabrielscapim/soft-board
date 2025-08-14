import { useFlexComponents } from '@/components'
import { useBoard } from '@/hooks'
import { FlexComponent } from '@/types'
import { useEffect, useState } from 'react'
import { MobileScreenContainer, NotFoundScreenContainer } from './components'

export function WireframeModeRoute () {
  const { boardState } = useBoard()
  const flexComponents = useFlexComponents(boardState)
  const [currentScreen, setCurrentScreen] = useState<FlexComponent | null>(
    flexComponents.find(component => component.type === 'mobileScreen') ?? null
  )

  useEffect(() => {
    setCurrentScreen(flexComponents.find(component => component.type === 'mobileScreen') ?? null)
  }, [flexComponents])

  return (
    <div className="justify-center flex h-full w-full items-center">
      {!currentScreen && <NotFoundScreenContainer />}

      {currentScreen && (
        <MobileScreenContainer
          currentScreen={currentScreen}
          components={flexComponents}
          onChangeScreen={setCurrentScreen}
        />
      )}
    </div>
  )
}
