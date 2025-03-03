import { Offset } from '../../types'
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
    if (this._selectedElement && this._offset) {
      event.preventDefault()

      const selected = this._boardState.selectedFlexComponents ?? []
      const selectedComponents = this._boardState.flexComponents.filter(flexComponent => selected.includes(flexComponent.id))

      if (selectedComponents.length === 0) {
        return
      }

      // Get the initial position of the group
      let groupMinX = selectedComponents[0].properties.x
      let groupMinY = selectedComponents[0].properties.y
      let groupMaxX = selectedComponents[0].properties.x + selectedComponents[0].properties.width
      let groupMaxY = selectedComponents[0].properties.y + selectedComponents[0].properties.height

      // Get the group boundaries
      selectedComponents.forEach(fc => {
        const { x, y, width, height } = fc.properties

        if (x < groupMinX) groupMinX = x
        if (y < groupMinY) groupMinY = y
        if (x + width > groupMaxX) groupMaxX = x + width
        if (y + height > groupMaxY) groupMaxY = y + height
      })

      const groupWidth = groupMaxX - groupMinX
      const groupHeight = groupMaxY - groupMinY

      const compositeDragging = {
        id: selectedComponents.length === 1 ? selectedComponents[0].id : null,
        properties: {
          x: groupMinX,
          y: groupMinY,
          width: groupWidth,
          height: groupHeight
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
          horizontal: guides.horizontal.map(guide => ({ lineGuide: guide.lineGuide, offset: guide.offset })),
          vertical: guides.vertical.map(guide => ({ lineGuide: guide.lineGuide, offset: guide.offset }))
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

      let snap: { type?: string; x?: number; y?: number } | undefined = undefined

      if (minGuideVertical || minGuideHorizontal) {
        snap = {
          type: minGuideVertical?.snap || minGuideHorizontal?.snap,
          x: minGuideVertical ? minGuideVertical.lineGuide + minGuideVertical.offset : undefined,
          y: minGuideHorizontal ? minGuideHorizontal.lineGuide + minGuideHorizontal.offset : undefined
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
    const target = event.target as HTMLDivElement
    const draggableGroupElement = target.closest('.draggable-group') as HTMLDivElement | null
    const resizerElement = target.closest('.resizer') as HTMLDivElement | null

    if (draggableGroupElement) {
      this._selectedElement = draggableGroupElement
      this._offset = this.getMousePosition(event)
      this._boardManager.onStartDragFlexComponent({ id: draggableGroupElement.id as UUID })
    }

    if (!draggableGroupElement && !resizerElement) {
      this._boardManager.onStartDragFlexComponent({ id: null })
    }
  }
}
