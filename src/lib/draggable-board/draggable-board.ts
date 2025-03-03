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

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    return { x, y }
  }

  public endDrag () {
    this._selectedElement = undefined
    this._boardManager.onEndDragFlexComponent()
  }

  public onDragging (event: MouseEvent) {
    if (this._selectedElement && this._offset) {
      event.preventDefault()

      const guides = getAlignmentBoardGuides({
        flexComponents: this._boardState.flexComponents,
        selectedFlexComponent: this._boardState.selectedFlexComponent!
      })

      this._boardManager.onGuidesChanged({
        guides: {
          horizontal: guides.horizontal.map(guide => ({ lineGuide: guide.lineGuide, offset: guide.offset })),
          vertical: guides.vertical.map(guide => ({ lineGuide: guide.lineGuide, offset: guide.offset }))
        }
      })

      const coord = this.getMousePosition(event)
      const deltaX = Math.round((coord.x - (this._offset.x ?? 0)) / this._boardState.scale)
      const deltaY = Math.round((coord.y - (this._offset.y ?? 0)) / this._boardState.scale)

      const minGuideVertical = guides.vertical.sort((a, b) => a.diff - b.diff)[0]
      const minGuideHorizontal = guides.horizontal.sort((a, b) => a.diff - b.diff)[0]

      if (minGuideVertical || minGuideHorizontal) {
        this._boardManager.onDraggingFlexComponent({
          id: this._selectedElement.id as UUID,
          properties: {
            roundedDeltaX: deltaX,
            roundedDeltaY: deltaY,
          },
          snap: {
            type: minGuideVertical?.snap || minGuideHorizontal?.snap,
            x: minGuideVertical ? (minGuideVertical.lineGuide + minGuideVertical.offset) : undefined,
            y: (minGuideHorizontal?.lineGuide ?? 0) + (minGuideHorizontal?.offset ?? 0)
          }
        })

        return
      }

      if (!minGuideVertical && !minGuideHorizontal) {
        this._boardManager.onDraggingFlexComponent({
          id: this._selectedElement.id as UUID,
          properties: {
            roundedDeltaX: deltaX,
            roundedDeltaY: deltaY,
          }
        })
      }

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
