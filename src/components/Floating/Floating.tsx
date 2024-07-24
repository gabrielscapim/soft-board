import clsx, { ClassValue } from 'clsx'
import { PropsWithChildren, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export type FloatingProps = PropsWithChildren & {
  className?: ClassValue
}

export function Floating (props: FloatingProps) {
  const { children, className } = props

  const [container] = useState(document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(container)

    return () => {
      document.body.removeChild(container)
    }
  }, [container])

  return ReactDOM.createPortal(
    <div className={clsx('absolute', className)}>
      {children}
    </div>,
    container
  )
}
