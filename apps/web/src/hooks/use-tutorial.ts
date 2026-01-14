import { TUTORIALS } from '@/tutorials'
import { driver as driverjs, Driver } from 'driver.js'
import { useEffect, useRef } from 'react'

export function useTutorial (name?: keyof typeof TUTORIALS | null) {
  const driverRef = useRef<Driver | null>(null)

  useEffect(() => {
    if (!name) return

    const tutorial = TUTORIALS[name]

    driverRef.current = driverjs({
      popoverClass: 'driver-popover',
      showProgress: true,
      allowClose: false,
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      steps: tutorial.steps
    })

    driverRef.current.drive()
  }, [name])
}
