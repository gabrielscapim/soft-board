import { FlexComponent } from '@/types'
import { createElement, useMemo, useState } from 'react'
import { FLEX_COMPONENTS_ELEMENTS } from '@/flex-components'
import clsx from 'clsx'
import { TouchCursor } from './TouchCursor'

export type MobileScreenContainerProps = {
  currentScreen: FlexComponent
  components?: FlexComponent[]
  onChangeScreen?: (screen: FlexComponent) => void
}

export function MobileScreenContainer (props: MobileScreenContainerProps) {
  const { currentScreen, components = [], onChangeScreen } = props

  const [highlightConnections, setHighlightConnections] = useState(false)
  const [isOverScreen, setIsOverScreen] = useState(false)

  const children = useMemo(() => {
    if (!currentScreen) {
      return []
    }

    return components.filter(
      (component) => component.screenId === currentScreen.id
    )
  }, [currentScreen, components])

  const handleClickScreen = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    const component = components.find((c) => c.id === target.id)

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

      <div
        className="w-[391px] h-[828px] border-8 border-[#6b6b6b] rounded-[65px] overflow-hidden"
        onMouseEnter={() => setIsOverScreen(true)}
        onMouseLeave={() => setIsOverScreen(false)}
      >
        <div
          className="relative h-full overflow-y-scroll scrollbar"
          onClick={handleClickScreen}
        >
          <div style={{ height: currentScreen.properties.height + 'px' }}>
            {children
              .filter((flexComponent) => flexComponent.type !== 'mobileScreen')
              .map((flexComponent) => (
                createElement(FLEX_COMPONENTS_ELEMENTS[flexComponent.type], {
                  key: flexComponent.id,
                  className: clsx(
                    highlightConnections &&
                      flexComponent.connectionId &&
                      'shadow-[0_0_0_4px_rgba(59,130,246,0.7)] rounded animate-[pulse_1s_ease-in-out]'
                  ),
                  component: {
                    ...flexComponent,
                    properties: {
                      ...flexComponent.properties,
                      x: flexComponent.properties.x - currentScreen.properties.x,
                      y: flexComponent.properties.y - currentScreen.properties.y,
                    },
                  },
                  handleAction: (_, event) => {
                    if (
                      flexComponent.type === 'button' &&
                      event === 'onClick'
                    ) {
                      const connection = components.find(
                        (component) =>
                          component.id === flexComponent.connectionId
                      )
                      if (connection?.type === 'mobileScreen') {
                        onChangeScreen?.(connection)
                      }
                    }
                  }
                })
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
