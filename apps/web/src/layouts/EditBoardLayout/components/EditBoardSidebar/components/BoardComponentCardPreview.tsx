import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { FLEX_COMPONENTS_ELEMENTS } from '@/flex-components'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { FlexComponentProperties, FlexComponentType } from '@/types'
import clsx from 'clsx'
import { createElement } from 'react'
import { v4 as uuid } from 'uuid'

export type BoardComponentCardPreviewProps = {
  type: FlexComponentType
  name: string
  properties: FlexComponentProperties
  disabled?: boolean
  onClick?: () => void
}

const PREVIEW_WIDTH = 140
const PREVIEW_HEIGHT = 80

export function BoardComponentCardPreview (props: BoardComponentCardPreviewProps) {
  const { type, name, properties, disabled, onClick } = props

  return (
    <Card
      data-tutorial={TUTORIALS_ANCHORS.BoardComponentCardPreview}
      className={clsx(
        'w-full max-w-sm gap-2 hover:bg-accent hover:shadow-sm transition-shadow cursor-pointer py-4',
        disabled && 'opacity-50 hover:bg-transparent hover:shadow-none cursor-not-allowed'
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center justify-center h-20 px-2">
        <div
          className="flex items-center justify-center"
          style={{
            width: PREVIEW_WIDTH,
            height: PREVIEW_HEIGHT,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              transform: `scale(${calculateScale(properties.width, properties.height)})`,
              transformOrigin: 'center',
              width: `${properties.width}px`,
              height: `${properties.height}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {createElement(FLEX_COMPONENTS_ELEMENTS[type as FlexComponentType], {
              component: {
                id: uuid(),
                name,
                type: type as FlexComponentType,
                properties: {
                  ...properties,
                  x: 0,
                  y: 0,
                  absolute: false
                }
              }
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-xs text-center w-full">{name}</CardDescription>
      </CardFooter>
    </Card>
  )
}

const calculateScale = (width: number, height: number) => {
  const shouldScale = width > PREVIEW_WIDTH || height > PREVIEW_HEIGHT
  const scale = shouldScale
    ? Math.min(PREVIEW_WIDTH / width, PREVIEW_HEIGHT / height)
    : 1

  return scale
}
