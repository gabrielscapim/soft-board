import { MobileScreenFlexComponentProperties } from '../../types'
import { FlexComponentProps } from '../flex-components'

export function MobileScreenFlexComponent (props: FlexComponentProps) {
  const { component } = props

  const properties = component.properties as MobileScreenFlexComponentProperties

  return (
    <div
      id={component.id}
      className="draggable-group absolute mockup-phone bg-white"
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        zIndex: properties.zIndex
      }}
    >
    </div>
  )
}
