import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FlexComponent } from '@/types'
import clsx, { ClassValue } from 'clsx'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { ActionsTabContent, LayoutTabContent, PropertiesTabContent } from './Tabs'
import { BoardController, BoardState } from '@/lib'

export type BoardPropertiesMenuProps = {
  boardState: BoardState
  boardController: BoardController
  flexComponents: FlexComponent[]
  selectedFlexComponents: FlexComponent[]
  className?: ClassValue
}

export function BoardPropertiesMenu (props: BoardPropertiesMenuProps) {
  const {
    boardState,
    boardController,
    flexComponents,
    selectedFlexComponents,
    className
  } = props

  console.log(flexComponents)

  const [tab, setTab] = useState('properties')
  const [flexComponent, setFlexComponent] = useState<FlexComponent | null>(() => {
    const mobileScreen = selectedFlexComponents.find(c => c.type === 'mobileScreen')

    if (mobileScreen) {
      return mobileScreen
    } else {
      return selectedFlexComponents.length === 1 ? selectedFlexComponents[0] : null
    }
  })

  useEffect(() => {
    const mobileScreen = selectedFlexComponents.find(c => c.type === 'mobileScreen')

    if (selectedFlexComponents.length > 1 && !mobileScreen) {
      setTab('layout')
    }

    setFlexComponent(() => {
      if (mobileScreen) {
        return mobileScreen
      } else {
        return selectedFlexComponents.length === 1 ? selectedFlexComponents[0] : null
      }
    })
  }, [selectedFlexComponents])

  // Debounced commit function to update the flex component
  const commit = useDebouncedCallback((flexComponent: FlexComponent) => {
    boardController.onUpdateFlexComponent({
      flexComponent
    })
  }, 350)

  // Update properties of the flex component
  const onUpdateProperties = (
    key: string,
    value: unknown
  ) => {
    setFlexComponent(prev => {
      if (!prev) {
        return prev
      }
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
      if (!prev) {
        return prev
      }
      const newFlexComponent = { ...prev, [key]: value }
      commit(newFlexComponent)
      return newFlexComponent
    })
  }

  return (
    <div
      className={clsx('bg-sidebar absolute top-16 right-6 rounded-xl border w-80 shadow-md', className)}
      style={{ zIndex: 100_000 }}
    >
      <Tabs value={tab} className="gap-0" onValueChange={setTab}>
        <div className="mx-3 mb-0 mt-3">
          <TabsList className="w-full">
            <TabsTrigger
              value="properties"
              disabled={!flexComponent}
            >
              Properties
            </TabsTrigger>
            <TabsTrigger
              value="layout"
              disabled={!flexComponent}
            >
              Layout
            </TabsTrigger>
            <TabsTrigger
              value="actions"
              disabled={!flexComponent}
            >
              Actions
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="properties"
          className="p-4 flex flex-col gap-4"
        >
          {flexComponent && (
            <PropertiesTabContent
              flexComponent={flexComponent}
              screen={flexComponents?.find(component => component.id === flexComponent.screenId) ?? null}
              onUpdateProperties={onUpdateProperties}
              onUpdateName={value => onUpdateFlexComponent('name', value)}
            />
          )}
        </TabsContent>
        <TabsContent
          value="layout"
          className="p-4 flex flex-col gap-4"
        >
          <LayoutTabContent
            boardController={boardController}
          />
        </TabsContent>
        <TabsContent
          value="actions"
          className="p-4 flex flex-col gap-4"
        >
          {flexComponent && (
            <ActionsTabContent
              flexComponent={flexComponent}
              boardState={boardState}
              onUpdateConnection={value => onUpdateFlexComponent('connectionId', value)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
