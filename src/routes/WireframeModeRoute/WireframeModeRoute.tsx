import { createElement, useState } from 'react'
import { MobileScreenFlexComponent as MobileScreen } from '../../flex-components/components'
import { useBoard, useFlexComponents } from '../../hooks'
import { FlexComponent, MobileScreenFlexComponent } from '../../types'
import { FLEX_COMPONENTS } from '../../flex-components'

export function WireframeModeRoute () {
  const { boardState } = useBoard()
  const flexComponents = useFlexComponents(boardState)
  const [currentMobileScreen, setCurrentMobileScreen] = useState<MobileScreenFlexComponent | null>(
    flexComponents.find(component => component.type === 'mobileScreen') ?? null
  )

  const children = currentMobileScreen ? getMobileScreenChildren(currentMobileScreen, flexComponents) : []

  return (
    <div className="flex flex-col items-center justify-center w-screen h-[calc(100vh-64px)]">
      {currentMobileScreen && (
        <div style={{ position: 'relative', width: currentMobileScreen.properties.width, height: currentMobileScreen.properties.height }}>
          <MobileScreen component={{ ...currentMobileScreen, properties: { ...currentMobileScreen.properties, x: 0, y: 0 } }} />

          {children.map(flexComponent =>
            createElement(FLEX_COMPONENTS[flexComponent.type], {
              key: flexComponent.id,
              component: flexComponent,
              // TO-DO: handleAction
              handleAction: (_, event) => {
                if (flexComponent.type === 'button' && event === 'onClick') {
                  const connection = flexComponents.find(component => component.id === flexComponent.connection)

                  if (connection?.type === 'mobileScreen') {
                    setCurrentMobileScreen(connection)
                  }
                }
              }
            })
          )}
        </div>
      )}
    </div>
  )
}

export function getMobileScreenChildren (
  mobileScreen: MobileScreenFlexComponent,
  flexComponents: FlexComponent[] = []
): FlexComponent[] {
  const { x: screenX, y: screenY, width: screenWidth, height: screenHeight } = mobileScreen.properties

  const children = flexComponents
    .filter(flexComponent => {
      const { x, y } = flexComponent.properties

      if (flexComponent.id === mobileScreen.id) return false

      const insideHorizontally = x >= screenX && x < (screenX + screenWidth)
      const insideVertically = y >= screenY && y < (screenY + screenHeight)

      return insideHorizontally && insideVertically
    })
    .map(child => ({
      ...child,
      properties: {
        ...child.properties,
        x: child.properties.x - screenX,
        y: child.properties.y - screenY
      }
    }))

  return children
}
