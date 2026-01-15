import clsx from 'clsx'
import { MobileScreenSoftComponentProperties } from '../../../../types'
import { SoftComponentProps } from '../../../types'
import { PropsWithChildren } from 'react'

export type MobileScreenSoftComponentProps = SoftComponentProps & PropsWithChildren

export function MobileScreenSoftComponent (props: MobileScreenSoftComponentProps) {
  const { component, className, children } = props

  const properties = component.properties as MobileScreenSoftComponentProperties

  return (
    <div
      id={component.id}
      className={clsx(
        'mobile-screen',
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
        boxShadow: '0 0 0 8px rgba(61, 61, 68)'
      }}
    >
      {children}
    </div>
  )
}
