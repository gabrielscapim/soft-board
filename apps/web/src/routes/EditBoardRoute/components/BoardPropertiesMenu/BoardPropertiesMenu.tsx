import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components'
import { SoftComponent } from '@/types'
import clsx, { ClassValue } from 'clsx'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { ActionsTabContent, LayoutTabContent, PropertiesTabContent } from './Tabs'
import { BoardController, BoardState } from '@/lib'
import { TUTORIALS_ANCHORS } from '@/tutorials'

export type BoardPropertiesMenuProps = {
  boardState: BoardState
  boardController: BoardController
  softComponents: SoftComponent[]
  selectedSoftComponents: SoftComponent[]
  className?: ClassValue
}

export function BoardPropertiesMenu (props: BoardPropertiesMenuProps) {
  const {
    boardState,
    boardController,
    softComponents,
    selectedSoftComponents,
    className
  } = props

  const [tab, setTab] = useState('properties')
  const [softComponent, setSoftComponent] = useState<SoftComponent | null>(() => {
    const mobileScreen = selectedSoftComponents.find(c => c.type === 'mobileScreen')

    if (mobileScreen) {
      return mobileScreen
    } else {
      return selectedSoftComponents.length === 1 ? selectedSoftComponents[0] : null
    }
  })

  useEffect(() => {
    const mobileScreen = selectedSoftComponents.find(c => c.type === 'mobileScreen')

    if (selectedSoftComponents.length > 1 && !mobileScreen) {
      setTab('layout')
    }

    setSoftComponent(() => {
      if (mobileScreen) {
        return mobileScreen
      } else {
        return selectedSoftComponents.length === 1 ? selectedSoftComponents[0] : null
      }
    })
  }, [selectedSoftComponents])

  // Debounced commit function to update the soft component
  const commit = useDebouncedCallback((softComponent: SoftComponent) => {
    boardController.onUpdateSoftComponent({
      softComponent
    })
  }, 350)

  // Update properties of the soft component
  const onUpdateProperties = (
    key: string,
    value: unknown
  ) => {
    setSoftComponent(prev => {
      if (!prev) {
        return prev
      }
      const newSoftComponent = { ...prev, properties: { ...prev.properties, [key]: value } }
      commit(newSoftComponent)
      return newSoftComponent
    })
  }

  // Update the soft component itself (e.g., name, connection)
  const onUpdateSoftComponent = (
    key: string,
    value: unknown
  ) => {
    setSoftComponent(prev => {
      if (!prev) {
        return prev
      }
      const newSoftComponent = { ...prev, [key]: value }
      commit(newSoftComponent)
      return newSoftComponent
    })
  }

  return (
    <div
      data-tutorial={TUTORIALS_ANCHORS.BoardPropertiesMenu}
      className={clsx('bg-sidebar absolute top-24 right-8 rounded-xl border w-80 shadow-md', className)}
      style={{ zIndex: 100_000 }}
    >
      <Tabs value={tab} className="gap-0" onValueChange={setTab}>
        <div className="mx-3 mb-0 mt-3">
          <TabsList className="w-full">
            <TabsTrigger
              value="properties"
              disabled={!softComponent}
            >
              Properties
            </TabsTrigger>
            <TabsTrigger
              value="layout"
              disabled={!softComponent}
            >
              Layout
            </TabsTrigger>
            <TabsTrigger
              data-tutorial={TUTORIALS_ANCHORS.BoardPropertiesMenuActionsTab}
              value="actions"
              disabled={!softComponent}
            >
              Actions
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="properties"
          className="p-4 flex flex-col gap-4"
        >
          {softComponent && (
            <PropertiesTabContent
              softComponent={softComponent}
              screen={softComponents?.find(component => component.id === softComponent.screenId) ?? null}
              boardState={boardState}
              onUpdateProperties={onUpdateProperties}
              onUpdateName={value => onUpdateSoftComponent('name', value)}
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
          {softComponent && (
            <ActionsTabContent
              softComponent={softComponent}
              boardState={boardState}
              onUpdateConnection={value => onUpdateSoftComponent('connectionId', value)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
