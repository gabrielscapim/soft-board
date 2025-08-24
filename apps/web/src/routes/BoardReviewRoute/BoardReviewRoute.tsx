import { useFlexComponents } from '@/components'
import { FLEX_COMPONENTS_ELEMENTS } from '@/flex-components'
import { useBoard } from '@/hooks'
import { FlexComponent } from '@/types'
import { createElement, useEffect, useMemo, useState } from 'react'

/**
 * This route is responsible for rendering the board to be used in the review process.
 * The Playwright will interact with the board components during the review and capture screenshots.
 */
export function BoardReviewRoute () {
  const { boardState } = useBoard()
  const flexComponents = useFlexComponents(boardState)
  const [currentScreen, setCurrentScreen] = useState<FlexComponent | null>(
    flexComponents.find(component => component.type === 'mobileScreen') ?? null
  )

  const children = useMemo(() => {
      if (!currentScreen) {
        return []
      }

      return flexComponents.filter(
        (component) => component.screenId === currentScreen.id
      )
    }, [currentScreen, flexComponents])

  useEffect(() => {
    setCurrentScreen(flexComponents.find(component => component.type === 'mobileScreen') ?? null)
  }, [flexComponents])

  // Add event listener to update current screen for Playwright
  useEffect(() => {
    if (window) {
      (window as any).__setCurrentScreen = (screenId: string) => {
        const screen = flexComponents.find(component => component.id === screenId) ?? null
        setCurrentScreen(screen)
      }
    }
  }, [flexComponents])

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
        className="w-[391px] border-8 border-[#6b6b6b] rounded-[65px]"
        style={{ height: currentScreen.properties.height + 'px' }}
      >
        {children
              .filter((flexComponent) => flexComponent.type !== 'mobileScreen')
              .map((flexComponent) => (
                createElement(FLEX_COMPONENTS_ELEMENTS[flexComponent.type], {
                  key: flexComponent.id,
                  component: {
                    ...flexComponent,
                    properties: {
                      ...flexComponent.properties,
                      x: flexComponent.properties.x - currentScreen.properties.x,
                      y: flexComponent.properties.y - currentScreen.properties.y
                    }
                  }
                })
              ))
            }
      </div>
    </main>

  )
}
