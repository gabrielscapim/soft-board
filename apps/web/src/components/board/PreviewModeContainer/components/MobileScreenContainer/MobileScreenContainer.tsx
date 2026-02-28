import { SoftComponent, MobileScreenSoftComponent } from '@/types'
import { createElement, useEffect, useMemo, useState } from 'react'
import { SOFT_COMPONENTS_ELEMENTS } from '@/soft-components'
import clsx from 'clsx'
import { MobileScreenContainerTopBar, TouchCursor } from './components'
import { TUTORIALS_ANCHORS } from '@/tutorials'

export type MobileScreenContainerProps = {
  screens: MobileScreenSoftComponent[]
  currentScreen: MobileScreenSoftComponent
  components?: SoftComponent[]
  onChangeScreen?: (screen: MobileScreenSoftComponent) => void
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
      const mobileHeight = 828 + 36 + 16 // including top bar

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
    <div
      id="mobile-screen-wrapper"
      className="w-full h-full flex items-center justify-center"
    >
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
          data-tutorial={TUTORIALS_ANCHORS.PreviewModeContainerMobileScreenContainer}
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
                .filter((component) => component.type !== 'mobileScreen')
                .map((component) => (
                  createElement(SOFT_COMPONENTS_ELEMENTS[component.type], {
                    key: component.id,
                    className: clsx(
                      highlightConnections &&
                        component.connectionId &&
                        'shadow-[0_0_0_4px_rgba(59,130,246,0.7)] rounded animate-[pulse_1s_ease-in-out]'
                    ),
                    component: {
                      ...component,
                      properties: {
                        ...component.properties,
                        x: component.properties.x - currentScreen.properties.x,
                        y: component.properties.y - currentScreen.properties.y
                      }
                    },
                    handleAction: (_, event) => {
                      if (
                        component.type === 'button' &&
                        event === 'onClick'
                      ) {
                        const connection = components.find((c) => c.id === component.connectionId)

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

