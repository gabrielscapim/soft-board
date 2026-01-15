import { BoardState } from '@/lib'
import { MobileScreenSoftComponent } from '@/types'
import { useMemo, useState, useEffect } from 'react'
import { MobileScreenContainer, NotFoundScreenContainer } from './components'
import { useBoardStore } from '../BoardCanvas'

export type PreviewModeContainerProps = {
  boardState: BoardState
}

export function PreviewModeContainer (props: PreviewModeContainerProps) {
  const { boardState } = props

  const softComponents = useBoardStore(boardState, 'softComponentsChanged', state => state.softComponents)

  const screens = useMemo(() => {
    const result = softComponents
      .filter(component => component.type === 'mobileScreen')
      .sort((a, b) => {
        const aMain = a.properties.main ? 0 : 1
        const bMain = b.properties.main ? 0 : 1

        return aMain - bMain
      })

    return result
  }, [softComponents])

  const [currentScreen, setCurrentScreen] = useState<MobileScreenSoftComponent | null>(() => (screens[0] ?? null))

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
      components={softComponents}
      onChangeScreen={setCurrentScreen}
    />
  )
}
