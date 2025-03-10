import { ReactNode } from 'react'
import { BoardController } from '../../../lib'
import { Button } from '../../Button'

const ORDER_OPTIONS: { name: string; label: string; icon: ReactNode }[] = [
  {
    name: 'front',
    label: 'Move to front',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="10" height="7" rx="1" fill="#444444"/>
        <rect x="7" y="8" width="10" height="7" rx="1" fill="#444444"/>
        <rect x="10" y="12" width="10" height="7" rx="1" fill="#888888" stroke="#888888" strokeWidth="0.5"/>
      </svg>
    )
  },
  {
    name: 'forward',
    label: 'Move forward',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="12" height="9" rx="1" fill="#444444"/>
        <rect x="8" y="9" width="12" height="9" rx="1" fill="#888888" stroke="#888888" strokeWidth="0.5"/>
      </svg>
    )
  },
  {
    name: 'back',
    label: 'Move to back',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="10" height="7" rx="1" fill="#888888"/>
        <rect x="7" y="8" width="10" height="7" rx="1" fill="#444444"/>
        <rect x="10" y="12" width="10" height="7" rx="1" fill="#444444" stroke="#444444" strokeWidth="0.5"/>
      </svg>
    )
  },
  {
    name: 'backward',
    label: 'Move backward',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="12" height="9" rx="1" fill="#888888"/>
        <rect x="8" y="9" width="12" height="9" rx="1" fill="#444444" stroke="#444444" strokeWidth="0.5"/>
      </svg>
    )
  }
]

export type OrderComponentsProps = {
  boardController: BoardController
}

export function OrderComponents (props: OrderComponentsProps) {
  const { boardController } = props

  return (
    <div className="flex gap-2 justify-between">
      {ORDER_OPTIONS.map(option => (
        <div
          key={option.name}
          className="tooltip tooltip-left"
          data-tip={option.label}
        >
          <Button
            size="md"
            square
            onClick={() => boardController.onOrderFlexComponents(option.name)}
          >
            {option.icon}
          </Button>
        </div>
      ))}
    </div>
  )
}
