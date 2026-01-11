import { BoardState } from '@/lib'
import { MobileScreenFlexComponent } from '@/types'
import { useMemo, useState, useEffect } from 'react'
import { useBoardStore } from '../Board'
import { MobileScreenContainer, NotFoundScreenContainer } from './components'

export type PreviewModeContainerProps = {
  boardState: BoardState
}

export function PreviewModeContainer (props: PreviewModeContainerProps) {
  const { boardState } = props

  const flexComponents = useBoardStore(boardState, 'flexComponentsChanged', state => state.flexComponents)

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

  if (!currentScreen) {
    return <NotFoundScreenContainer />
  }

  return (
    <MobileScreenContainer
      screens={screens}
      currentScreen={currentScreen}
      components={flexComponents}
      onChangeScreen={setCurrentScreen}
    />
  )
}
