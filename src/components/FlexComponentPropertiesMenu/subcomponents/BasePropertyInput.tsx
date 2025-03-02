import { useRef } from 'react'
import { FlexComponentProperties, FlexComponentProperty } from '../../../types'

export type BasePropertyInputProps<T extends FlexComponentProperty> = {
  property: T
  name?: string
  properties?: FlexComponentProperties
  onBlur?: () => void
  onUpdateProperties?: (property: T, value: number) => void
}

export function BasePropertyInput (props: BasePropertyInputProps<FlexComponentProperty>) {
  const { property, name, properties, onUpdateProperties, onBlur } = props

  const ref = useRef<HTMLInputElement>(null)

  return (
    <label className="input input-xs input-bordered flex items-center gap-2">
      <span className="w-4">{name}</span>
      <input
        type="number"
        className="grow"
        ref={ref}
        value={properties?.[property] ?? ''}
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
