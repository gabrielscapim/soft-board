import { Dimensions, FlexComponent, Offset } from '../../../types'
import { BoardState } from '../board-state'
import { getAlignmentBoardGuides } from '../get-alignment-board-guides'
import { OnStartDragFlexComponentParams, OnDraggingFlexComponentParams } from './types'

const DISTANCE_TO_BREAK_SNAP = 5

export class DraggableBoard {
  private _boardState: BoardState
  private _boardElement: HTMLElement
  private _offset: Offset | undefined
  private _selectedElement: HTMLDivElement | undefined
  private _initialFlexComponentProperties: Map<string, Dimensions & Offset> | null = null

  constructor (
    boardState: BoardState,
    boardElement: HTMLElement
  ) {
    this._boardState = boardState
    this._boardElement = boardElement

    this.startDrag = this.startDrag.bind(this)
    this.onDragging = this.onDragging.bind(this)
    this.endDrag = this.endDrag.bind(this)
  }

  private clickedInsideGroup (selectedComponents: FlexComponent[], clickPosition: Offset) {
    const groupDimensions = this.getGroupDimensions(selectedComponents)
    const scale = this._boardState.scale
    const translate = this._boardState.translate

    return (
      clickPosition.x >= groupDimensions.x * scale + translate.x &&
      clickPosition.x <= (groupDimensions.x + groupDimensions.width) * scale + translate.x &&
      clickPosition.y >= groupDimensions.y * scale + translate.y &&
      clickPosition.y <= (groupDimensions.y + groupDimensions.height) * scale + translate.y
    )
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

    if (!selected || selected.length === 0 || !this._initialFlexComponentProperties) {
      return
    }

    if (!this._boardState.isDragging) {
      this._boardState.setIsDragging(true)
    }

    let groupInitialX = Infinity
    let groupInitialY = Infinity

    for (const id of selected) {
      const initProps = this._initialFlexComponentProperties.get(id)

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

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      if (!selected.includes(flexComponent.id)) {
        return flexComponent
      }

      const initialProps = this._initialFlexComponentProperties?.get(flexComponent.id)
      if (!initialProps) return flexComponent

      const newX = initialProps.x + groupDeltaX
      const newY = initialProps.y + groupDeltaY

      return {
        ...flexComponent,
        properties: {
          ...flexComponent.properties,
          x: newX,
          y: newY
        },
        screenId
      }
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }

  private onEndDragFlexComponent () {
    this._boardState.setIsDragging(false)
    this._initialFlexComponentProperties = null
  }

  private onStartDragFlexComponent (params: OnStartDragFlexComponentParams) {
    const currentSelection = this._boardState.selectedFlexComponents ?? []
    let newSelection: string[] = []

    if (params.clickedInsideGroup && params.id) {
      newSelection = currentSelection
    }

    if (params.clickedInsideGroup && !params.id) {
      newSelection = currentSelection
    }

    if (params.clickedInsideGroup && params.id && params.event.shiftKey) {
      newSelection = Array.from(new Set([...currentSelection, params.id]))
    }

    if (!params.clickedInsideGroup && params.id && !params.event.shiftKey) {
      newSelection = [params.id]
    }

    if (!params.clickedInsideGroup && params.id && params.event.shiftKey) {
      newSelection = Array.from(new Set([...currentSelection, params.id]))
    }

    const initialProperties = new Map<string, Dimensions & Offset>()

    for (const selectedId of newSelection) {
      const component = this._boardState.flexComponents.find(flexComponent => flexComponent.id === selectedId)

      if (component) {
        initialProperties.set(selectedId, {
          x: component.properties.x,
          y: component.properties.y,
          width: component.properties.width,
          height: component.properties.height
        })
      }
    }

    this._initialFlexComponentProperties = initialProperties
    this._boardState.setSelectedFlexComponents(newSelection)
  }

  public endDrag () {
    this._selectedElement = undefined
    this._offset = undefined
    this.onEndDragFlexComponent()
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
      let screenId: string | undefined = undefined
      const screens = this._boardState.flexComponents.filter(component => component.type === 'mobileScreen')

      for (const screen of screens) {
        const screenProperties = screen.properties
        const isInsideScreen = (
          compositeDragging.properties.x >= screenProperties.x &&
          compositeDragging.properties.x + compositeDragging.properties.width <= screenProperties.x + screenProperties.width &&
          compositeDragging.properties.y >= screenProperties.y &&
          compositeDragging.properties.y + compositeDragging.properties.height <= screenProperties.y + screenProperties.height
        )

        if (isInsideScreen) {
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
            roundedDeltaY: deltaY,
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

    const target = event.target as HTMLDivElement
    const draggableGroupElement = target.closest('.draggable-group') as HTMLDivElement | null
    const resizerElement = target.closest('.resizer') as HTMLDivElement | null
    const selectedFlexComponents = this._boardState.selectedFlexComponents

    // Clicked in a flex component
    if (draggableGroupElement) {
      const clickedInsideGroup = Boolean(selectedFlexComponents && selectedFlexComponents?.length > 1)

      this._selectedElement = draggableGroupElement
      this._offset = this.getMousePosition(event)
      this.onStartDragFlexComponent({ id: draggableGroupElement.id, event, clickedInsideGroup })

      return
    }

    // Clicked outside a flex component
    if (!draggableGroupElement && !resizerElement) {

      // If there is only one flex component selected or none, deselect it
      if (selectedFlexComponents?.length === 1 || selectedFlexComponents?.length === 0) {
        this._boardState.setSelectedFlexComponents(null)
        return
      }

      // Check if the click was inside a group
      const flexComponents = this._boardState.flexComponents.filter(flexComponent => selectedFlexComponents?.includes(flexComponent.id))
      const clickPosition = this.getMousePosition(event)
      const clickedInsideGroup = this.clickedInsideGroup(flexComponents, clickPosition)

      if (clickedInsideGroup) {
        this._offset = clickPosition
        this.onStartDragFlexComponent({ event, clickedInsideGroup: true })
      }

      if (!clickedInsideGroup) {
        this._boardState.setSelectedFlexComponents(null)
      }
    }
  }
}
