import { driver as driverjs, DriveStep } from 'driver.js'
import { PropsWithChildren } from 'react'
import { DriverContext } from './DriverContext'

export type DriverProviderProps = PropsWithChildren & {
  steps: DriveStep[]
}

export function DriverProvider (props: DriverProviderProps) {
  const { children, steps } = props

  const driver = driverjs({
    popoverClass: 'driver-popover',
    showProgress: true,
    allowClose: false,
    nextBtnText: 'Next',
    prevBtnText: 'Back',
    steps
  })

  return (
    <DriverContext.Provider value={driver}>
      {children}
    </DriverContext.Provider>
  )
}
