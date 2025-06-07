import { FLEX_COMPONENTS_SCHEMAS } from '@/flex-components'
import { useMemo } from 'react'
import { BoardComponentCardPreview } from './BoardComponentCardPreview'
import Fuse from 'fuse.js'

export type BoardScreensPreviewProps = {
  search: string
}

export function BoardScreensPreview (props: BoardScreensPreviewProps) {
  const { search } = props

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

  return (
    <>
      {screensPreview.map(screen => (
        <BoardComponentCardPreview
          key={screen.variation.name}
          type={screen.type as 'mobileScreen'}
          name={screen.variation.name}
          properties={screen.variation.properties}
        />
      ))}
    </>
  )
}
