import { useRef } from 'react'
import { BaseProperty, FlexComponentProperties } from '../../../types'

export type BasePropertyInputProps = {
  property: BaseProperty
  name?: string
  properties?: FlexComponentProperties
  onBlur?: () => void
  onUpdateProperties?: (property: BaseProperty, value: number) => void
}

export function BasePropertyInput (props: BasePropertyInputProps) {
  const { property, name, properties, onUpdateProperties, onBlur } = props

  const ref = useRef<HTMLInputElement>(null)
  const value = (properties?.[property] ?? 0) as number

  return (
    <label className="input input-xs input-bordered flex items-center gap-2">
      <span className="w-4">{name}</span>
      <input
        type="number"
        className="grow"
        ref={ref}
        value={value}
        onChange={event => onUpdateProperties?.(property, Number(event.target.value))}
        onBlur={onBlur}
        onKeyUp={event => {
          if (event.key === 'Enter') {
            ref.current!.blur()
          }
        }}
        />
    </label>
  )
}
