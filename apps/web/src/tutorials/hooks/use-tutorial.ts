import { TUTORIALS } from '@/tutorials'
import { driver as driverjs, Driver, Config, DriveStep } from 'driver.js'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useLocalStorage from 'use-local-storage'

type TutorialName = keyof typeof TUTORIALS

type TutorialState = {
  allowed: boolean | null
  tutorials: Record<TutorialName, { completed: boolean }>
}

const BASE_DRIVER_CONFIG: Config = {
  popoverClass: 'driver-popover',
  showProgress: true,
  allowClose: true
}

export function useTutorial (name?: TutorialName | null) {
  const { t } = useTranslation()
  const driverRef = useRef<Driver | null>(null)

  const [tutorialState, setTutorialState] = useLocalStorage<TutorialState>(
    'sf-tutorial-state',
    {
      allowed: null,
      tutorials: {
        'board-init': { completed: false },
        'board-requirements': { completed: false },
        'board-wireflows': { completed: false },
        'board-review': { completed: false },
        'edit-board': { completed: false },
        'onboarding': { completed: false },
        'board-preview': { completed: false }
      }
    }
  )

  useEffect(() => {
    if (!name || tutorialState.allowed !== true) return

    const isCompleted = tutorialState.tutorials[name].completed
    const tutorial = TUTORIALS[name]
    const steps = resolveSteps(tutorial.steps, t)

    const onDestroyStarted: Config['onDestroyStarted'] = (_element, _step, { driver }) => {
      driverRef.current = null

      setTutorialState(prev => {
        if (!prev) return prev

        return {
          ...prev,
          tutorials: {
            ...prev.tutorials,
            [name]: { ...prev.tutorials[name], completed: true }
          }
        }
      })

      driver.destroy()
    }

    const driver = driverjs({
      ...BASE_DRIVER_CONFIG,
      nextBtnText: t('next'),
      prevBtnText: t('back'),
      doneBtnText: t('done'),
      steps,
      onDestroyStarted
    })

    if (!isCompleted) {
      driverRef.current = driver
      driverRef.current.drive()
    }

  }, [name, tutorialState, setTutorialState, t])

  function runTutorialOnce (name: TutorialName) {
    const tutorial = TUTORIALS[name]
    const steps = resolveSteps(tutorial.steps, t)

    const driver = driverjs({
      ...BASE_DRIVER_CONFIG,
      nextBtnText: t('next'),
      prevBtnText: t('back'),
      steps,
      onDestroyStarted: (_el, _step, { driver }) => {
        driverRef.current = null
        driver.destroy()
      }
    })

    driverRef.current = driver
    driverRef.current.drive()
  }

  function onChangeTutorialState (key: keyof TutorialState, value: any) {
    setTutorialState(prev => {
      if (!prev) return prev

      return {
        ...prev,
        [key]: value
      }
    })
  }

  return {
    state: tutorialState,
    isRunning: driverRef.current !== null,
    onChange: onChangeTutorialState,
    runTutorialOnce
  }
}

function resolveSteps (
  steps: DriveStep[],
  t: (key: string, opts?: any) => string
): DriveStep[] {
  return steps.map(step => {
    if (!step.popover) return step

    return {
      ...step,
      popover: {
        ...step.popover,
        title: step.popover.title
          ? t(step.popover.title, { ns: 'tutorial' })
          : undefined,
        description: step.popover.description
          ? t(step.popover.description, { ns: 'tutorial' })
          : undefined
      }
    }
  })
}
