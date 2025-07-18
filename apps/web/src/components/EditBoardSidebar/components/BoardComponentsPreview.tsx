import { FLEX_COMPONENTS_SCHEMAS } from '@/flex-components'
import { useMemo } from 'react'
import { BoardComponentCardPreview } from './BoardComponentCardPreview'
import { FlexComponentType } from '@/types'
import Fuse from 'fuse.js'
import { useScreenDimensions } from '@/hooks'
import { BoardController } from '@/lib'

export type BoardComponentsPreviewProps = {
  boardController: BoardController
  search: string
}

export function BoardComponentsPreview (props: BoardComponentsPreviewProps) {
  const { boardController, search } = props

  const { width, height } = useScreenDimensions()

  const componentsPreview = useMemo(() => {
    const components = Object.entries(FLEX_COMPONENTS_SCHEMAS)
      .flatMap(([type, schema]) => schema.variations.map(variation => ({ type, variation })))
      .filter(type => type.type !== 'mobileScreen')

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
      {!componentsPreview.length && <span className="opacity-40">No components found</span>}
      {componentsPreview.map(component => (
        <BoardComponentCardPreview
          key={component.variation.name}
          type={component.type as FlexComponentType}
          name={component.variation.name}
          properties={component.variation.properties}
          onClick={() => boardController.onAddFlexComponent({
            type: component.type as FlexComponentType,
            properties: component.variation.properties,
            name: component.variation.name,
            position
          })}
        />
      ))}
    </>
  )
}
