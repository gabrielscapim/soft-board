import { ReactNode } from 'react'
import { useSelectedFlexComponents } from '../../hooks'
import { BoardController, BoardState } from '../../lib'
import { Button } from '../Button'
import { Floating } from '../Floating'

export type GroupComponentsPropertiesMenuProps = {
  boardState: BoardState
  boardController: BoardController
}

const ALIGNMENT_OPTIONS: { name: string, label: string, icon: ReactNode }[] = [
  {
    name: 'left',
    label: 'Align components to the left',
    icon: <>
      <rect x="3" y="3" width="3" height="18" fill="#808080"/>
      <rect x="8" y="6" width="10" height="12" fill="#808080"/>
    </>
  },
  {
    name: 'center',
    label: 'Align components to the center',
    icon: <>
      <rect x="10" y="3" width="4" height="18" fill="#808080"/>
      <rect x="5" y="6" width="14" height="12" fill="#808080"/>
    </>
  },
  {
    name: 'right',
    label: 'Align components to the right',
    icon: <>
      <rect x="18" y="3" width="3" height="18" fill="#808080"/>
      <rect x="6" y="6" width="10" height="12" fill="#808080"/>
    </>
  },
  {
    name: 'top',
    label: 'Align components to the top',
    icon: <>
      <rect x="3" y="3" width="18" height="3" fill="#808080"/>
      <rect x="6" y="8" width="12" height="10" fill="#808080"/>
    </>
  },
  {
    name: 'middle',
    label: 'Align components to the middle',
    icon: <>
      <rect x="3" y="10" width="18" height="4" fill="#808080"/>
      <rect x="6" y="5" width="12" height="14" fill="#808080"/>
    </>
  },
  {
    name: 'bottom',
    label: 'Align components to the bottom',
    icon: <>
      <rect x="3" y="18" width="18" height="3" fill="#808080"/>
      <rect x="6" y="6" width="12" height="10" fill="#808080"/>
    </>
  },
  {
    name: 'full-width',
    label: 'Make components full width',
    icon: <>
      <rect x="3" y="8" width="18" height="10" fill="#808080"/>
    </>
  },
  {
    name: 'full-height',
    label: 'Make components full height',
    icon: <>
      <rect x="8" y="3" width="10" height="18" fill="#808080"/>
    </>
  }
]

export function GroupComponentsPropertiesMenu (props: GroupComponentsPropertiesMenuProps) {
  const { boardState, boardController } = props

  const selected = useSelectedFlexComponents(boardState)

  if (!selected || selected?.length === 0 || selected?.length === 1) {
    return
  }

  return (
    <Floating className="top-20 right-4">
      <ul className="menu bg-base-200 text-base-content min-h-full w-52 rounded-box h-[calc(100vh-6rem)]">
        <li className="pb-2">Design</li>
        <div className="grid grid-cols-4 gap-2 p-2">
          {ALIGNMENT_OPTIONS.map(option => (
            <div
              key={option.name}
              className="tooltip tooltip-left"
              data-tip={option.label}
            >
              <Button
                size="sm"
                square
                onClick={() => boardController.onAlignComponents(option.name)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {option.icon}
                </svg>
              </Button>
            </div>
          ))}
        </div>
      </ul>
    </Floating>
  )
}
