import { BatteryFull, Signal, Wifi } from 'lucide-react'
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
      }}
    >
      <div className="absolute top-0 w-[60%] h-6 bg-gray-300 rounded-b-xl" />
      <div className="absolute top-2 left-4 text-gray-500 text-sm">09:41</div>
      <div className="absolute top-2 right-3 flex gap-1 text-gray-500">
        <Signal size={16} />
        <Wifi size={16} />
        <BatteryFull size={16} />
      </div>
      <div className="flex-1 w-full bg-white rounded-2xl" />
      <div className="absolute bottom-2 w-24 h-1.5 bg-gray-400 rounded-full" />
    </div>
  )
}
