import { MobileScreenFlexComponentProperties } from '../../types'
import { FlexComponentProps } from '../flex-components'

export function MobileScreenFlexComponent (props: FlexComponentProps) {
  const { component } = props

  const properties = component.properties as MobileScreenFlexComponentProperties

  return (
    <div
      id={component.id}
      className="draggable-group absolute w-[375px] h-[812px] bg-gray-100 rounded-3xl border-8 border-gray-300 flex flex-col items-center"
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        zIndex: properties.zIndex
      }}
    >
      <div className="flex-1 w-full bg-white rounded-2xl" />
      <div className="absolute bottom-2 w-24 h-1.5 bg-gray-400 rounded-full" />
    </div>
  )
}
