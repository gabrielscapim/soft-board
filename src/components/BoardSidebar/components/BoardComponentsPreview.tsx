import { FLEX_COMPONENTS_SCHEMAS } from '@/flex-components'
import { useMemo } from 'react'
import { BoardComponentCardPreview } from './BoardComponentCardPreview'
import { FlexComponentType } from '@/types'
import Fuse from 'fuse.js'

export type BoardComponentsPreviewProps = {
  search: string
}

export function BoardComponentsPreview (props: BoardComponentsPreviewProps) {
  const { search } = props

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

  return (
    <>
      {componentsPreview.map(component => (
        <BoardComponentCardPreview
          key={component.variation.name}
          type={component.type as FlexComponentType}
          name={component.variation.name}
          properties={component.variation.properties}
        />
      ))}
    </>
  )
}
