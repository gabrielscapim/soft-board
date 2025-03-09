import { FlexComponent, Offset } from '../../types'
import { UUID } from '../../types/common/uuid'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { getAlignmentBoardGuides } from '../get-alignment-board-guides'

/**
 * Class responsible to turn components inside the board draggable.
 */
export class DraggableBoard {
  private _boardManager: BoardManager
  private _boardState: BoardState
  private _boardElement: HTMLElement
  private _offset: Offset | undefined
  private _selectedElement: HTMLDivElement | undefined

  constructor (
    boardState: BoardState,
    boardElement: HTMLElement
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState
    this._boardElement = boardElement

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

  public endDrag () {
    this._selectedElement = undefined
    this._offset = undefined
    this._boardManager.onEndDragFlexComponent()
  }

  public onDragging (event: MouseEvent) {
    if (this._offset) {
      event.preventDefault()

      const selected = this._boardState.selectedFlexComponents ?? []
      const selectedComponents = this._boardState.flexComponents.filter(flexComponent => selected.includes(flexComponent.id))

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

      // Get the alignment guides
      const guides = getAlignmentBoardGuides({
        flexComponents: this._boardState.flexComponents,
        dragging: compositeDragging,
        selectedFlexComponents: selected
      })

      this._boardManager.onGuidesChanged({
        guides: {
          horizontal: guides.horizontal.filter(guide => guide.diff <= 1),
          vertical: guides.vertical.filter(guide => guide.diff <= 1)
        }
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

      this._boardManager.onDraggingFlexComponent({
        id: this._selectedElement?.id as UUID,
        properties: {
          roundedDeltaX: deltaX,
          roundedDeltaY: deltaY,
        },
        snap
      })
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
      this._boardManager.onStartDragFlexComponent({ id: draggableGroupElement.id as UUID, event, clickedInsideGroup })

      return
    }

    // Clicked outside a flex component
    if (!draggableGroupElement && !resizerElement) {

      // If there is only one flex component selected or none, deselect it
      if (selectedFlexComponents?.length === 1 || selectedFlexComponents?.length === 0) {
        this._boardManager.onClickOutsideOfFlexComponent()
        return
      }

      // Check if the click was inside a group
      // ADICIONAR TRANSFORMAÇÃO DE ESCALA
      const flexComponents = this._boardState.flexComponents.filter(flexComponent => selectedFlexComponents?.includes(flexComponent.id))
      const groupDimensions = this.getGroupDimensions(flexComponents)
      const clickPosition = this.getMousePosition(event)
      const clickedInsideGroup =
        clickPosition.x >= groupDimensions.x &&
        clickPosition.x <= groupDimensions.x + groupDimensions.width &&
        clickPosition.y >= groupDimensions.y &&
        clickPosition.y <= groupDimensions.y + groupDimensions.height

      if (clickedInsideGroup) {
        this._offset = clickPosition
        this._boardManager.onStartDragFlexComponent({ event, clickedInsideGroup: true })
      }

      if (!clickedInsideGroup) {
        this._boardManager.onClickOutsideOfFlexComponent()
      }
    }
  }
}
