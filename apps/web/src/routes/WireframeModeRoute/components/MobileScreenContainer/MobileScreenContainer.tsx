import { FlexComponent, MobileScreenFlexComponent } from '@/types'
import { createElement, useEffect, useMemo, useState } from 'react'
import { FLEX_COMPONENTS_ELEMENTS } from '@/flex-components'
import clsx from 'clsx'
import { MobileScreenContainerTopBar, TouchCursor } from './components'

export type MobileScreenContainerProps = {
  screens: MobileScreenFlexComponent[]
  currentScreen: MobileScreenFlexComponent
  components?: FlexComponent[]
  onChangeScreen?: (screen: MobileScreenFlexComponent) => void
}

export function MobileScreenContainer (props: MobileScreenContainerProps) {
  const { screens, currentScreen, components = [], onChangeScreen } = props

  const [highlightConnections, setHighlightConnections] = useState(false)
  const [isOverScreen, setIsOverScreen] = useState(false)
  const [scale, setScale] = useState(1)

  const children = useMemo(() => {
    if (!currentScreen) {
      return []
    }

    return components.filter(
      (component) => component.screenId === currentScreen.id
    )
  }, [currentScreen, components])

  useEffect(() => {
    const calculateScale = () => {
      const container = document.getElementById('mobile-screen-wrapper')

      if (!container) return

      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight
      const mobileWidth = 391
      const mobileHeight = 828

      const scaleX = (containerWidth - 32) / mobileWidth
      const scaleY = (containerHeight - 32) / mobileHeight

      const newScale = Math.min(scaleX, scaleY, 1)

      setScale(newScale)
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)

    return () => window.removeEventListener('resize', calculateScale)
  }, [])

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
    <div id="mobile-screen-wrapper" className="w-full h-full flex items-center justify-center">
      {isOverScreen && <TouchCursor />}

      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <MobileScreenContainerTopBar
          currentScreen={currentScreen}
          screens={screens}
          onChangeScreen={onChangeScreen}
        />
        <div
          className="w-[391px] h-[828px] border-8 border-[rgba(61,61,68,1)] bg-white rounded-[65px] overflow-hidden"
          onMouseEnter={() => setIsOverScreen(true)}
          onMouseLeave={() => setIsOverScreen(false)}
        >
          <div
            className="relative h-full overflow-y-scroll scrollbar overflow-x-hidden"
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
                        y: flexComponent.properties.y - currentScreen.properties.y
                      }
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
      </div>
    </div>
  )
}

