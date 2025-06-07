import { FLEX_COMPONENTS_SCHEMAS } from '@/flex-components'
import { useMemo } from 'react'
import { BoardComponentCardPreview } from './BoardComponentCardPreview'
import { FlexComponentType } from '@/types'

export function BoardComponentsPreview () {
  const componentsPreview = useMemo(() => {
    const components = Object.entries(FLEX_COMPONENTS_SCHEMAS)
      .flatMap(([type, schema]) => schema.variations.map(variation => ({ type, variation })))
      .filter(type => type.type !== 'mobileScreen')

    return components
  }, [])

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
