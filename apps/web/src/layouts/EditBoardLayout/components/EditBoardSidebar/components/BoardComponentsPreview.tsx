import { SOFT_COMPONENTS_SCHEMAS } from '@/soft-components'
import { useMemo } from 'react'
import { BoardComponentCardPreview } from './BoardComponentCardPreview'
import { SoftComponentType } from '@/types'
import Fuse from 'fuse.js'
import { useScreenDimensions } from '@/hooks'
import { BoardController } from '@/lib'
import { useTranslation } from 'react-i18next'

export type BoardComponentsPreviewProps = {
  boardController: BoardController
  search: string
  disabled?: boolean
}

export function BoardComponentsPreview (props: BoardComponentsPreviewProps) {
  const { boardController, search, disabled } = props

  const { width, height } = useScreenDimensions()
  const { t } = useTranslation('layouts.editBoardLayout')

  const componentsPreview = useMemo(() => {
    const components = Object.entries(SOFT_COMPONENTS_SCHEMAS)
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
    x: (Math.round((width / 2) / 10) * 10) - 100,
    y: (Math.round((height / 2) / 10) * 10) - 100
  }

  return (
    <>
      {!componentsPreview.length && <span className="opacity-40">{t('boardComponentsPreview.noComponents')}</span>}
      {componentsPreview.map(component => (
        <BoardComponentCardPreview
          key={component.variation.name}
          disabled={disabled}
          type={component.type as SoftComponentType}
          name={t(`schema.${component.variation.name}`, { ns: 'soft-components' })}
          properties={component.variation.properties}
          onClick={() => {
            if (disabled) return

            boardController.onAddSoftComponent({
              type: component.type as SoftComponentType,
              properties: component.variation.properties,
              name: component.variation.name,
              position
            })
          }}
        />
      ))}
    </>
  )
}
