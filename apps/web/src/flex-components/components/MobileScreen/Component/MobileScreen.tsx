import { MobileScreenFlexComponentProperties } from '../../../../types'
import { FlexComponentProps } from '../../../types'

export function MobileScreenFlexComponent (props: FlexComponentProps) {
  const { component } = props
  const properties = component.properties as MobileScreenFlexComponentProperties

  return (
    <div
      id={component.id}
      className="draggable-group absolute rounded-[65px] grid place-items-center overflow-hidden bg-sidebar"
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        zIndex: properties.zIndex,
        boxShadow: '0 0 0 8px #6b6b6b'
      }}
    />
  )
}
