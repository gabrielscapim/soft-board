import { Dimensions, FlexComponent, Offset } from '../../../types'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { getAlignmentBoardGuides } from '../get-alignment-board-guides'
import { OnStartDragFlexComponentParams, OnDraggingFlexComponentParams } from './types'

const DISTANCE_TO_BREAK_SNAP = 5
const DISTANCE_TO_TRIGGER_DRAG = 0.5

export type DraggableBoardOptions = {
  boardElement: HTMLElement
  boardState: BoardState
  boardManager: BoardManager
}

type InitialProperties = Map<string, Dimensions & Offset & { screenId?: string | null }>

export class DraggableBoard {
  private _boardElement: HTMLElement
  private _boardState: BoardState
  private _boardManager: BoardManager
  private _hasDragged: boolean = false
  private _offset: Offset | undefined
  private _selectedElement: HTMLDivElement | undefined
  private _initialProperties: InitialProperties | null = null

  constructor (options: DraggableBoardOptions) {
    this._boardElement = options.boardElement
    this._boardState = options.boardState
    this._boardManager = options.boardManager

    this.startDrag = this.startDrag.bind(this)
    this.onDragging = this.onDragging.bind(this)
    this.endDrag = this.endDrag.bind(this)
  }

  private getGroupDimensions (selectedComponents: FlexComponent[]) {
    if (selectedComponents.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 }
    }

    let groupMinX = selectedComponents[0].properties.x
    let groupMinY = selectedComponents[0].properties.y
    let groupMaxX = selectedComponents[0].properties.x + selectedComponents[0].properties.width
    let groupMaxY = selectedComponents[0].properties.y + selectedComponents[0].properties.height

    selectedComponents.forEach(fc => {
      const { x, y, width, height } = fc.properties

      if (x < groupMinX) groupMinX = x
      if (y < groupMinY) groupMinY = y
      if (x + width > groupMaxX) groupMaxX = x + width
      if (y + height > groupMaxY) groupMaxY = y + height
    })

    const groupWidth = groupMaxX - groupMinX
    const groupHeight = groupMaxY - groupMinY

    return {
      x: groupMinX,
      y: groupMinY,
      width: groupWidth,
      height: groupHeight
    }
  }

  private getMousePosition (event: MouseEvent) {
    const rect = this._boardElement.getBoundingClientRect()

    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  private onDraggingFlexComponent (params: OnDraggingFlexComponentParams) {
    const { properties, snap, screenId } = params

    const selected = this._boardState.selectedFlexComponents

    if (!selected || selected.length === 0 || !this._initialProperties) {
      return
    }

    if (!this._boardState.isDragging) {
      this._boardState.setIsDragging(true)
    }

    let groupInitialX = Infinity
    let groupInitialY = Infinity

    for (const id of selected) {
      const initProps = this._initialProperties.get(id)

      if (initProps && initProps?.x < groupInitialX) groupInitialX = initProps.x
      if (initProps && initProps?.y < groupInitialY) groupInitialY = initProps.y
    }

    const groupNewX = groupInitialX + properties.roundedDeltaX
    const groupNewY = groupInitialY + properties.roundedDeltaY

    let useSnapX = false
    let useSnapY = false

    if (snap?.x && Math.abs(groupNewX - snap.x) < DISTANCE_TO_BREAK_SNAP) {
      useSnapX = true
    }

    if (snap?.y && Math.abs(groupNewY - snap.y) < DISTANCE_TO_BREAK_SNAP) {
      useSnapY = true
    }

    const groupDeltaX = useSnapX && snap?.x ? (snap.x - groupInitialX) : properties.roundedDeltaX
    const groupDeltaY = useSnapY && snap?.y ? (snap.y - groupInitialY) : properties.roundedDeltaY

    const movingMobileScreen = selected.some(id => {
      const component = this._boardState.flexComponents.find(fc => fc.id === id)
      return component?.type === 'mobileScreen'
    })

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      if (!selected.includes(flexComponent.id)) {
        return flexComponent
      }

      const initialProps = this._initialProperties?.get(flexComponent.id)

      if (!initialProps) return flexComponent

      const newX = initialProps.x + groupDeltaX
      const newY = initialProps.y + groupDeltaY

      let newScreenId = flexComponent.screenId


      if (flexComponent.type === 'mobileScreen') {
        newScreenId = null
      } else if (movingMobileScreen && initialProps.screenId) {
        newScreenId = initialProps.screenId
      } else if (!movingMobileScreen) {
        newScreenId = screenId
      }

      return {
        ...flexComponent,
        properties: {
          ...flexComponent.properties,
          x: newX,
          y: newY
        },
        screenId: newScreenId
      }
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }

  private onStartDragFlexComponent (params: OnStartDragFlexComponentParams) {
    const currentSelection = this._boardState.selectedFlexComponents ?? []
    const currentScreenId = this._boardState.flexComponents.find(component => currentSelection[0] === component.id)?.screenId

    const clickedComponent = this._boardState.flexComponents.find(component => component.id === params.id)
    const clickedScreenId = clickedComponent?.screenId

    let newSelection = [params.id]

    if (currentScreenId === clickedScreenId && clickedComponent?.type !== 'mobileScreen') {
      if (params.event.shiftKey) {
        newSelection = Array.from(new Set([...currentSelection, params.id]))
      }

      if (!params.event.shiftKey && currentSelection.length > 1) {
        newSelection = Array.from(new Set([...currentSelection, params.id]))
      }

      if (!params.event.shiftKey && currentSelection.length === 1) {
        newSelection = [params.id]
      }
    }

    const initialProperties = new Map<string, Dimensions & Offset & { screenId?: string | null }>()

    for (const selectedId of newSelection) {
      const component = this._boardState.flexComponents.find(flexComponent => flexComponent.id === selectedId)

      if (!component) {
        continue
      }

      initialProperties.set(selectedId, structuredClone({
        x: component.properties.x,
        y: component.properties.y,
        width: component.properties.width,
        height: component.properties.height,
        screenId: component.screenId
      }))

      if (component.type === 'mobileScreen') {
        const childComponents = this._boardState.flexComponents.filter(c => c.screenId === component.id)

        for (const child of childComponents) {
          initialProperties.set(child.id, structuredClone({
            x: child.properties.x,
            y: child.properties.y,
            width: child.properties.width,
            height: child.properties.height,
            screenId: component.id
          }))
        }

        newSelection = Array.from(new Set([...newSelection, ...childComponents.map(c => c.id)]))
      }
    }

    this._initialProperties = initialProperties
    this._boardState.setSelectedFlexComponents(newSelection)
  }

  public endDrag () {
    const selectedIds = this._boardState.selectedFlexComponents ?? []
    const selectedComponents = this._boardState.flexComponents.filter(flexComponent => selectedIds.includes(flexComponent.id))

    if (selectedComponents.length && this._hasDragged) {
      this._boardManager.updateFlexComponents({
        updatedFlexComponents: selectedComponents,
        initialProperties: this._initialProperties
      })
    }

    this._selectedElement = undefined
    this._offset = undefined
    this._boardState.setIsDragging(false)
    this._initialProperties = null
  }

  public onDragging (event: MouseEvent) {
    if (this._offset) {
      event.preventDefault()

      const selectedIds = this._boardState.selectedFlexComponents ?? []
      const selectedComponents = this._boardState.flexComponents.filter(flexComponent => selectedIds.includes(flexComponent.id))

      if (selectedComponents.length === 0) {
        return
      }

      const groupDimensions = this.getGroupDimensions(selectedComponents)

      const compositeDragging = {
        id: selectedComponents.length === 1 ? selectedComponents[0].id : null,
        properties: {
          x: groupDimensions.x,
          y: groupDimensions.y,
          width: groupDimensions.width,
          height: groupDimensions.height
        }
      }

      // Verify if the composite dragging is inside some screen
      let screenId: string | null = null

      const screens = this._boardState.flexComponents.filter(component => component.type === 'mobileScreen')

      for (const screen of screens) {
        const TOLERANCE = -25

        const outside =
          compositeDragging.properties.x + compositeDragging.properties.width  < screen.properties.x - TOLERANCE
          || compositeDragging.properties.x > screen.properties.x + screen.properties.width + TOLERANCE
          || compositeDragging.properties.y + compositeDragging.properties.height < screen.properties.y - TOLERANCE
          || compositeDragging.properties.y > screen.properties.y + screen.properties.height + TOLERANCE

        if (!outside) {
          screenId = screen.id
          break
        }
      }

      // Get the alignment guides
      const guides = getAlignmentBoardGuides({
        flexComponents: this._boardState.flexComponents,
        dragging: compositeDragging,
        selectedFlexComponents: selectedIds
      })

      this._boardState.setGuides({
        horizontal: guides.horizontal.filter(guide => guide.diff <= 1),
        vertical: guides.vertical.filter(guide => guide.diff <= 1)
      })

      // Calculate the delta
      const coord = this.getMousePosition(event)
      const deltaX = Math.round((coord.x - (this._offset.x ?? 0)) / this._boardState.scale)
      const deltaY = Math.round((coord.y - (this._offset.y ?? 0)) / this._boardState.scale)

      if (Math.abs(deltaX) > DISTANCE_TO_TRIGGER_DRAG || Math.abs(deltaY) > DISTANCE_TO_TRIGGER_DRAG) {
        this._hasDragged = true
      }

      // Calculate the snap
      const sortedVertical = guides.vertical.slice().sort((a, b) => a.diff - b.diff)
      const sortedHorizontal = guides.horizontal.slice().sort((a, b) => a.diff - b.diff)
      const minGuideVertical = sortedVertical[0]
      const minGuideHorizontal = sortedHorizontal[0]

      let snap: { type?: string; x?: number; y?: number, distance?: 'primary' | 'secondary' } | undefined = undefined

      if (minGuideVertical || minGuideHorizontal) {
        snap = {
          type: minGuideVertical?.snap || minGuideHorizontal?.snap,
          x: minGuideVertical ? minGuideVertical.lineGuide + minGuideVertical.offset : undefined,
          y: minGuideHorizontal ? minGuideHorizontal.lineGuide + minGuideHorizontal.offset : undefined,
          distance: minGuideVertical?.distance || minGuideHorizontal?.distance
        }
      }

      if (this._selectedElement) {
        this.onDraggingFlexComponent({
          id: this._selectedElement?.id,
          properties: {
            roundedDeltaX: deltaX,
            roundedDeltaY: deltaY
          },
          snap,
          screenId
        })
      }
    }
  }

  public startDrag (event: MouseEvent) {
    if (event.button === 1) {
      return
    }

    this._hasDragged = false

    const target = event.target as HTMLDivElement
    const draggableGroupElement = target.closest('.draggable-group') as HTMLDivElement | null
    const resizerElement = target.closest('.resizer') as HTMLDivElement | null
    const mobileScreenBarElement = target.closest('.mobile-screen-bar') as HTMLDivElement | null

    if (resizerElement) {
      return
    }

    if (draggableGroupElement) {
      this._selectedElement = draggableGroupElement
      this._offset = this.getMousePosition(event)
      this.onStartDragFlexComponent({ id: draggableGroupElement.id, event })

      return
    }

    if (mobileScreenBarElement) {
      const screenId = mobileScreenBarElement.getAttribute('data-screen-id') as string
      const mobileScreenElement = document.getElementById(screenId) as HTMLDivElement

      this._selectedElement = mobileScreenElement
      this._offset = this.getMousePosition(event)
      this.onStartDragFlexComponent({ id: mobileScreenElement.id, event })

      return
    }

    if (!mobileScreenBarElement && !draggableGroupElement) {
      this._boardState.setSelectedFlexComponents([])
    }
  }
}
