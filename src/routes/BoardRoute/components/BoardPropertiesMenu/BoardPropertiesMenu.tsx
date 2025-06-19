import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BoardController, BoardState } from '@/lib'
import { FlexComponent, FlexComponentProperties } from '@/types'
import clsx, { ClassValue } from 'clsx'
import { ActionsTabContent, LayoutTabContent, PropertiesTabContent } from './Tabs'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export type BoardPropertiesMenuTabProps = {
  boardState: BoardState
  boardController: BoardController
  selected: FlexComponent
  onUpdateProperties<T extends keyof FlexComponentProperties>(key: T, value: FlexComponentProperties[T]): void
  properties: FlexComponentProperties
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
  const { selected, className, boardController } = props

  const [tab, setTab] = useState('properties')
  const [properties, setProperties] = useState<FlexComponentProperties>(selected.properties)

  useEffect(() => {
    setTab('properties')
  }, [selected.id])


  const commit = useDebouncedCallback((properties: FlexComponentProperties) => {
    boardController.onUpdateFlexComponent({
      flexComponent: {
        ...selected,
        properties
      }
    })
  }, 200)

  const onUpdateProperties = <T extends keyof typeof properties>(
    key: T,
    value: (typeof properties)[T]
  ) => {
    setProperties(prev => {
      const newProperties = { ...prev, [key]: value }
      commit(newProperties)
      return newProperties
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
          <TabsContent key={tab.value} value={tab.value} className="p-4 flex flex-col gap-4">
            <tab.content
              {...props}
              onUpdateProperties={onUpdateProperties}
              properties={properties}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
