import { useFlexComponents } from '@/components'
import { useBoardContext } from '@/hooks'
import { FlexComponent } from '@/types'
import { useState } from 'react'
import { MobileScreenContainer, NotFoundScreenContainer } from './components'

export function WireframeModeRoute () {
  const { boardState } = useBoardContext()

  const flexComponents = useFlexComponents(boardState)
  const [currentScreen, setCurrentScreen] = useState<FlexComponent | null>(
    flexComponents.find(component => component.type === 'mobileScreen') ?? null
  )

  return (
    <div className="justify-center flex h-full w-full">
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
