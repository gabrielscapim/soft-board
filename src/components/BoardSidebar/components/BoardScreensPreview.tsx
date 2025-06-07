import { FLEX_COMPONENTS_SCHEMAS } from '@/flex-components'
import { useMemo } from 'react'
import { BoardComponentCardPreview } from './BoardComponentCardPreview'

export function BoardScreensPreview () {
  const screensPreview = useMemo(() => {
    const components = Object.entries(FLEX_COMPONENTS_SCHEMAS)
      .flatMap(([type, schema]) => schema.variations.map(variation => ({ type, variation })))
      .filter(type => type.type === 'mobileScreen')

    return components
  }, [])

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
