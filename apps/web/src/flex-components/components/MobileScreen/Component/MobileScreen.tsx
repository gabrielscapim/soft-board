import { MobileScreenFlexComponentProperties } from '../../../../types'
import { FlexComponentProps } from '../../../types'

export function MobileScreenFlexComponent (props: FlexComponentProps) {
  const { component } = props

  const properties = component.properties as MobileScreenFlexComponentProperties

  return (
    <div
      id={component.id}
      className="draggable-group absolute bg-white border-[6px] border-[#6b6b6b] rounded-[65px] p-[11px] grid place-items-center overflow-hidden"
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        zIndex: properties.zIndex
      }}
    />
  )
}
