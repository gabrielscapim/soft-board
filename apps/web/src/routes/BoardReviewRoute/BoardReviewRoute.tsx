import { useBoardStore } from '@/components'
import { SOFT_COMPONENTS_ELEMENTS } from '@/flex-components'
import { useBoard } from '@/hooks'
import { SoftComponent } from '@/types'
import { createElement, useEffect, useMemo, useState } from 'react'

/**
 * This route is responsible for rendering the board to be used in the review process.
 * The Playwright will interact with the board components during the review and capture screenshots.
 */
export function BoardReviewRoute () {
  const { boardState } = useBoard()
  const softComponents = useBoardStore(boardState, 'softComponentsChanged', state => state.softComponents)
  const [currentScreen, setCurrentScreen] = useState<SoftComponent | null>(
    softComponents.find(component => component.type === 'mobileScreen') ?? null
  )

  const children = useMemo(() => {
      if (!currentScreen) {
        return []
      }

      return softComponents.filter(
        (component) => component.screenId === currentScreen.id
      )
    }, [currentScreen, softComponents])

  useEffect(() => {
    setCurrentScreen(softComponents.find(component => component.type === 'mobileScreen') ?? null)
  }, [softComponents])

  // Add event listener to update current screen for Playwright
  useEffect(() => {
    if (window) {
      (window as any).__setCurrentScreen = (screenId: string) => {
        const screen = softComponents.find(component => component.id === screenId) ?? null
        setCurrentScreen(screen)
      }
    }
  }, [softComponents])

  // Cleanup function to remove event listener
  useEffect(() => {
    return () => {
      if (window) {
        delete (window as any).__setCurrentScreen
      }
    }
  }, [])

  if (!currentScreen) {
    return (
      <span>No screens found.</span>
    )
  }

  return (
    <main>
      <div
        data-testid="screen-container"
        className="w-[391px] h-[828px] border-8 border-[#3d3d44] bg-white rounded-[65px] overflow-hidden"
        style={{ height: currentScreen.properties.height + 'px' }}
      >
        <div
          className="relative h-full overflow-y-scroll scrollbar overflow-x-hidden"
        >
          <div style={{ height: currentScreen.properties.height + 'px' }}>
            {children
              .filter((softComponent) => softComponent.type !== 'mobileScreen')
              .map((softComponent) => (
                createElement(SOFT_COMPONENTS_ELEMENTS[softComponent.type], {
                  key: softComponent.id,
                  component: {
                    ...softComponent,
                    properties: {
                      ...softComponent.properties,
                      x: softComponent.properties.x - currentScreen.properties.x,
                      y: softComponent.properties.y - currentScreen.properties.y
                    }
                  }
                })
              ))
            }
          </div>
        </div>
      </div>
    </main>
  )
}
