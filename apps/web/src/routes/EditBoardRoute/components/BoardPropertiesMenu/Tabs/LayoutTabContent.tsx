import { ReactNode } from 'react'
import { Button } from '@/components'
import { BoardController } from '@/lib'
import { useTranslation } from 'react-i18next'

const ORDER_OPTIONS: { name: string; label: string; icon: ReactNode }[] = [
  {
    name: 'front',
    label: 'Front',
    icon: (
      <>
        <rect x="4" y="4" width="10" height="7" rx="1" fill="#444444"/>
        <rect x="7" y="8" width="10" height="7" rx="1" fill="#444444"/>
        <rect x="10" y="12" width="10" height="7" rx="1" fill="#888888" stroke="#888888" strokeWidth="0.5"/>
      </>
    )
  },
  {
    name: 'forward',
    label: 'Forward',
    icon: (
      <>
        <rect x="4" y="6" width="12" height="9" rx="1" fill="#444444"/>
        <rect x="8" y="9" width="12" height="9" rx="1" fill="#888888" stroke="#888888" strokeWidth="0.5"/>
      </>
    )
  },
  {
    name: 'back',
    label: 'Back',
    icon: (
      <>
        <rect x="4" y="4" width="10" height="7" rx="1" fill="#888888"/>
        <rect x="7" y="8" width="10" height="7" rx="1" fill="#444444"/>
        <rect x="10" y="12" width="10" height="7" rx="1" fill="#444444" stroke="#444444" strokeWidth="0.5"/>
      </>
    )
  },
  {
    name: 'backward',
    label: 'Backward',
    icon: (
      <>
        <rect x="4" y="6" width="12" height="9" rx="1" fill="#888888"/>
        <rect x="8" y="9" width="12" height="9" rx="1" fill="#444444" stroke="#444444" strokeWidth="0.5"/>
      </>
    )
  }
]

const ALIGNMENT_OPTIONS: { name: string, label: string, icon: ReactNode }[] = [
  {
    name: 'left',
    label: 'Left',
    icon: <>
      <rect x="3" y="3" width="3" height="18" fill="#808080"/>
      <rect x="8" y="6" width="10" height="12" fill="#808080"/>
    </>
  },
  {
    name: 'center',
    label: 'Center',
    icon: <>
      <rect x="10" y="3" width="4" height="18" fill="#808080"/>
      <rect x="5" y="6" width="14" height="12" fill="#808080"/>
    </>
  },
  {
    name: 'right',
    label: 'Right',
    icon: <>
      <rect x="18" y="3" width="3" height="18" fill="#808080"/>
      <rect x="6" y="6" width="10" height="12" fill="#808080"/>
    </>
  },
  {
    name: 'top',
    label: 'Top',
    icon: <>
      <rect x="3" y="3" width="18" height="3" fill="#808080"/>
      <rect x="6" y="8" width="12" height="10" fill="#808080"/>
    </>
  },
  {
    name: 'middle',
    label: 'Middle',
    icon: <>
      <rect x="3" y="10" width="18" height="4" fill="#808080"/>
      <rect x="6" y="5" width="12" height="14" fill="#808080"/>
    </>
  },
  {
    name: 'bottom',
    label: 'Bottom',
    icon: <>
      <rect x="3" y="18" width="18" height="3" fill="#808080"/>
      <rect x="6" y="6" width="12" height="10" fill="#808080"/>
    </>
  },
  {
    name: 'full-width',
    label: 'Full width',
    icon: <>
      <rect x="3" y="8" width="18" height="10" fill="#808080"/>
    </>
  },
  {
    name: 'full-height',
    label: 'Full height',
    icon: <>
      <rect x="8" y="3" width="10" height="18" fill="#808080"/>
    </>
  }
]

export type LayoutTabContentProps = {
  boardController: BoardController
}

export function LayoutTabContent (props: LayoutTabContentProps) {
  const { boardController } = props

  const { t } = useTranslation('routes.editBoard')

  return (
    <>
      <div>
        <p className="text-sm leading-none font-medium select-none">
          {t('order.title')}
        </p>
        <p className="text-xs text-muted-foreground pb-3 pt-2">
          {t('order.description')}
        </p>
        <div className="grid grid-cols-4 gap-3">
          {ORDER_OPTIONS.map(option => (
            <div
              key={option.name}
              className="flex flex-col items-center gap-1"
              data-tip={option.label}
            >
              <Button
                size="icon"
                variant="outline"
                onClick={() => boardController.onOrderSoftComponents({ option: option.name })}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {option.icon}
                </svg>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {option.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm leading-none font-medium select-none">
          {t('alignment.title')}
        </p>
        <p className="text-xs text-muted-foreground pb-3 pt-2">
          {t('alignment.description')}
        </p>
        <div className="grid grid-cols-4 gap-3">
          {ALIGNMENT_OPTIONS.map(option => (
            <div
              key={option.name}
              className="flex flex-col items-center gap-1"
              data-tip={option.label}
            >
              <Button
                size="icon"
                variant="outline"
                onClick={() => boardController.onAlignSoftComponents({ option: option.name })}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {option.icon}
                </svg>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {option.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
