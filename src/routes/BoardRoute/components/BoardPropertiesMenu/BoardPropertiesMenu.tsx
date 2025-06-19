import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BoardController, BoardState } from '@/lib'
import { FlexComponent } from '@/types'
import clsx, { ClassValue } from 'clsx'
import { ActionsTabContent, LayoutTabContent, PropertiesTabContent } from './Tabs'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export type BoardPropertiesMenuTabProps = {
  boardState: BoardState
  flexComponent: FlexComponent
  onUpdateProperties (key: string, value: unknown): void
  onUpdateName (value: string): void
  onUpdateConnection (value: string): void
}

export type BoardPropertiesMenuProps = {
  boardState: BoardState
  boardController: BoardController
  selected: FlexComponent
  className?: ClassValue
}

const TABS = [
  {
    value: 'properties',
    label: 'Properties',
    content: PropertiesTabContent,
  },
  {
    value: 'layout',
    label: 'Layout',
    content: LayoutTabContent,
  },
  {
    value: 'actions',
    label: 'Actions',
    content: ActionsTabContent
  }
]

export function BoardPropertiesMenu (props: BoardPropertiesMenuProps) {
  const { selected, className, boardState, boardController } = props

  const [tab, setTab] = useState('properties')
  const [flexComponent, setFlexComponent] = useState<FlexComponent>(selected)

  useEffect(() => {
    setTab('properties')
    setFlexComponent(selected)
  }, [selected])

  // Debounced commit function to update the flex component
  const commit = useDebouncedCallback((flexComponent: FlexComponent) => {
    boardController.onUpdateFlexComponent({
      flexComponent
    })
  }, 200)

  // Update properties of the flex component
  const onUpdateProperties = (
    key: string,
    value: unknown
  ) => {
    setFlexComponent(prev => {
      const newFlexComponent = { ...prev, properties: { ...prev.properties, [key]: value } }
      commit(newFlexComponent)
      return newFlexComponent
    })
  }

  // Update the flex component itself (e.g., name, connection)
  const onUpdateFlexComponent = (
    key: string,
    value: unknown
  ) => {
    setFlexComponent(prev => {
      const newFlexComponent = { ...prev, [key]: value }
      commit(newFlexComponent)
      return newFlexComponent
    })
  }

  return (
    <div
      className={clsx('bg-sidebar absolute top-16 right-4 rounded-xl border w-80 shadow-md', className)}
      style={{ zIndex: 100_000 }}
    >
      <Tabs value={tab} className="gap-0" onValueChange={setTab}>
        <div className="mx-3 mb-0 mt-3">
          <TabsList className="w-full">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
        </div>
        {TABS.map(tab => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="p-4 flex flex-col gap-4"
          >
            <tab.content
              boardState={boardState}
              flexComponent={flexComponent}
              onUpdateProperties={onUpdateProperties}
              onUpdateName={value => onUpdateFlexComponent('name', value)}
              onUpdateConnection={value => onUpdateFlexComponent('connection', value)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
