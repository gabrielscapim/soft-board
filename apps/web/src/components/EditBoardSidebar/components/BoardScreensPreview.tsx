import { FLEX_COMPONENTS_SCHEMAS } from '@/flex-components'
import { useMemo } from 'react'
import { BoardComponentCardPreview } from './BoardComponentCardPreview'
import Fuse from 'fuse.js'
import { useScreenDimensions } from '@/hooks'
import { BoardController } from '@/lib'

export type BoardScreensPreviewProps = {
  boardController: BoardController
  search: string
}

export function BoardScreensPreview (props: BoardScreensPreviewProps) {
  const { boardController, search } = props

  const { width, height } = useScreenDimensions()

  const screensPreview = useMemo(() => {
    const components = Object.entries(FLEX_COMPONENTS_SCHEMAS)
      .flatMap(([type, schema]) => schema.variations.map(variation => ({ type, variation })))
      .filter(type => type.type === 'mobileScreen')

    if (!search.trim()) {
      return components
    }

    const fuse = new Fuse(components, {
      keys: ['variation.name'],
      threshold: 0.45
    })

    const filtered = fuse.search(search)

    return filtered.map(result => result.item)
  }, [search])

  const position = {
    x: Math.round((width / 2) / 10) * 10,
    y: Math.round((height / 2) / 10) * 10
  }

  return (
    <>
      {!screensPreview.length && <span className="opacity-40">No screens found</span>}
      {screensPreview.map(screen => (
        <BoardComponentCardPreview
          key={screen.variation.name}
          type={screen.type as 'mobileScreen'}
          name={screen.variation.name}
          properties={screen.variation.properties}
          onClick={() => boardController.onAddFlexComponent({
            type: screen.type as 'mobileScreen',
            properties: screen.variation.properties,
            name: screen.variation.name,
            position
          })}
        />
      ))}
    </>
  )
}
