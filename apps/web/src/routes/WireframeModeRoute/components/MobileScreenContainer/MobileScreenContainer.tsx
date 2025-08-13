import { FlexComponent } from '@/types'
import { createElement, useMemo, useState } from 'react'
import { FLEX_COMPONENTS_ELEMENTS, MobileScreenFlexComponent } from '@/flex-components'
import clsx from 'clsx'
import { TouchCursor } from './TouchCursor'

export type MobileScreenContainerProps = {
  currentScreen: FlexComponent
  components?: FlexComponent[]
  onChangeScreen?: (screen: FlexComponent) => void
}

export function MobileScreenContainer (props: MobileScreenContainerProps) {
  const {
    currentScreen,
    components = [],
    onChangeScreen
  } = props

  const [highlightConnections, setHighlightConnections] = useState(false)
  const [isOverScreen, setIsOverScreen] = useState(false)

  const children = useMemo(() => {
    if (!currentScreen) {
      return []
    }

    return components.filter(component => component.screenId === currentScreen.id)
  }, [currentScreen, components])

  const handleClickScreen = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    const component = components.find(c => c.id === target.id)

    if (component?.connectionId) {
      setHighlightConnections(false)
      return
    }

    setHighlightConnections(true)

    setTimeout(() => {
      setHighlightConnections(false)
    }, 1000)
  }

  return (
    <>
      {isOverScreen && <TouchCursor />}
      {currentScreen && (
        <div
          className="relative scale-95 w-[375px] bottom-1 origin-center"
          onMouseEnter={() => setIsOverScreen(true)}
          onMouseLeave={() => setIsOverScreen(false)}
          onClick={handleClickScreen}
        >
          <MobileScreenFlexComponent
            component={{
              ...currentScreen,
              properties: {
                ...currentScreen.properties,
                x: 0,
                y: 0
              }
            }}
          />
          {children.map(flexComponent =>
            createElement(FLEX_COMPONENTS_ELEMENTS[flexComponent.type], {
              key: flexComponent.id,
              className: clsx({
                'shadow-[0_0_0_4px_rgba(59,130,246,0.7)] rounded animate-[pulse_1s_ease-in-out]':
                  highlightConnections && flexComponent.connectionId
              }),
              component: {
                ...flexComponent,
                properties: {
                  ...flexComponent.properties,
                  x: flexComponent.properties.x - currentScreen.properties.x,
                  y: flexComponent.properties.y - currentScreen.properties.y
                }
              },
              handleAction: (_, event) => {
                if (flexComponent.type === 'button' && event === 'onClick') {
                  const connection = components.find(
                    component => component.id === flexComponent.connectionId
                  )

                  if (connection?.type === 'mobileScreen') {
                    onChangeScreen?.(connection)
                  }
                }
              }
            })
          )}
        </div>
      )}
    </>
  )
}
