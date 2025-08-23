import clsx from 'clsx'
import { MobileScreenFlexComponentProperties } from '../../../../types'
import { FlexComponentProps } from '../../../types'
import { PropsWithChildren } from 'react'

export type MobileScreenFlexComponentProps = FlexComponentProps & PropsWithChildren

export function MobileScreenFlexComponent (props: MobileScreenFlexComponentProps) {
  const { component, className, children } = props

  const properties = component.properties as MobileScreenFlexComponentProperties

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        'absolute',
        'rounded-[65px]',
        'grid',
        'place-items-center',
        'overflow-hidden',
        'bg-white',
        className
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        zIndex: properties.zIndex,
        boxShadow: '0 0 0 8px #6b6b6b'
      }}
    >
      {children}
    </div>
  )
}
