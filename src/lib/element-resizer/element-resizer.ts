import { FlexComponent, Guide, Offset, ResizeDirection } from '../../types'
import { BoardManager } from '../board-manager'
import { OnResizingFlexComponentParams } from '../board-manager/board-manager-interface'
import { BoardState } from '../board-state'
import { getAlignmentBoardGuides } from '../get-alignment-board-guides'

export class ElementResizer {
  private _boardManager: BoardManager
  private _boardState: BoardState
  private _resizeDirection: ResizeDirection | undefined
  private _boardElement: HTMLElement
  private _offset: Offset | undefined
  private _selectedResizerElement: HTMLElement | undefined
  private _transform: DOMMatrix | undefined

  constructor (
    boardState: BoardState,
    boardElement: HTMLElement
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState
    this._boardElement = boardElement

    this.startResize = this.startResize.bind(this)
    this.onResizing = this.onResizing.bind(this)
    this.endResize = this.endResize.bind(this)
  }

  private getClosestGuide (guides: Guide[], target: number): Guide | undefined {
    const closestGuide = guides.reduce((closest, current) => {
      const currentDiff = Math.abs(target - (current.lineGuide + (current.offset || 0)))
      const closestDiff = Math.abs(target - (closest.lineGuide + (closest.offset || 0)))

      return currentDiff < closestDiff ? current : closest
    }, guides[0])

    return closestGuide
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

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    return { x, y }
  }

  private getSnapByDirection (
    guides: { horizontal: Guide[], vertical: Guide[] },
    groupDimensions: { x: number, y: number, width: number, height: number },
    position: { roundedDeltaX: number, roundedDeltaY: number },
    dimension: { roundedDeltaX: number, roundedDeltaY: number }
  ) {
    if (guides.horizontal.length === 0 && guides.vertical.length === 0) {
      return undefined
    }

    switch (this._resizeDirection) {
      case 'n': {
        const targetY = groupDimensions.y + position.roundedDeltaY
        const closestGuide = this.getClosestGuide(guides.horizontal, targetY)

        if (!closestGuide) {
          return undefined
        }

        return {
          type: closestGuide.snap,
          position: {
            y: closestGuide.lineGuide + closestGuide.offset
          },
          dimension: {
            y: - (closestGuide.lineGuide + closestGuide.offset)
          },
          distance: closestGuide?.distance
        }
      }
      case 'ne': {
        const targetY = groupDimensions.y + position.roundedDeltaY
        const targetX = groupDimensions.x + groupDimensions.width + dimension.roundedDeltaX
        const closestHorizontal = this.getClosestGuide(guides.horizontal, targetY)
        const closestVertical = this.getClosestGuide(guides.vertical, targetX)

        return {
          type: closestVertical?.snap,
          position: {
            y: closestHorizontal ? closestHorizontal.lineGuide + closestHorizontal.offset : undefined,
          },
          dimension: {
            x: closestVertical?.lineGuide,
            y: closestHorizontal ? - (closestHorizontal.lineGuide + closestHorizontal.offset) : undefined
          },
          distance: closestVertical?.distance
        }
      }
      case 'e': {
        const targetX = groupDimensions.x + groupDimensions.width + dimension.roundedDeltaX
        const closestGuide = this.getClosestGuide(guides.vertical, targetX)

        return {
          type: closestGuide?.snap,
          dimension: {
            x: closestGuide?.lineGuide
          },
          distance: closestGuide?.distance
        }
      }
      case 'se': {
        const targetX = groupDimensions.x + groupDimensions.width + dimension.roundedDeltaX
        const targetY = groupDimensions.y + groupDimensions.height + dimension.roundedDeltaY
        const closestVertical = this.getClosestGuide(guides.vertical, targetX)
        const closestHorizontal = this.getClosestGuide(guides.horizontal, targetY)

        return {
          type: closestVertical?.snap,
          dimension: {
            x: closestVertical?.lineGuide,
            y: closestHorizontal?.lineGuide
          },
          distance: closestVertical?.distance
        }
      }
      case 's': {
        const targetY = groupDimensions.y + groupDimensions.height + dimension.roundedDeltaY
        const closestGuide = this.getClosestGuide(guides.horizontal, targetY)

        return {
          type: closestGuide?.snap,
          dimension: {
            y: closestGuide?.lineGuide
          },
          distance: closestGuide?.distance
        }
      }
      case 'sw': {
        const targetX = groupDimensions.x + position.roundedDeltaX
        const targetY = groupDimensions.y + groupDimensions.height + dimension.roundedDeltaY
        const closestVertical = this.getClosestGuide(guides.vertical, targetX)
        const closestHorizontal = this.getClosestGuide(guides.horizontal, targetY)

        return {
          type: closestVertical?.snap,
          position: {
            x: closestVertical ? closestVertical.lineGuide + closestVertical.offset : undefined
          },
          dimension: {
            x: closestVertical ? - (closestVertical.lineGuide + closestVertical.offset) : undefined,
            y: closestHorizontal?.lineGuide
          },
          distance: closestVertical?.distance
        }
      }
      case 'w': {
        const targetX = groupDimensions.x + position.roundedDeltaX
        const closestGuide = this.getClosestGuide(guides.vertical, targetX)

        return {
          type: closestGuide?.snap,
          position: {
            x: closestGuide ? closestGuide.lineGuide + closestGuide.offset : undefined
          },
          dimension: {
            x: closestGuide ? - (closestGuide.lineGuide + closestGuide.offset) : undefined
          },
          distance: closestGuide?.distance
        }
      }
      case 'nw': {
        const targetX = groupDimensions.x + position.roundedDeltaX
        const targetY = groupDimensions.y + position.roundedDeltaY
        const closestVertical = this.getClosestGuide(guides.vertical, targetX)
        const closestHorizontal = this.getClosestGuide(guides.horizontal, targetY)

        return {
          type: closestVertical?.snap,
          position: {
            x: closestVertical ? closestVertical.lineGuide + closestVertical.offset : undefined,
            y: closestHorizontal ? closestHorizontal.lineGuide + closestHorizontal.offset : undefined
          },
          dimension: {
            x: closestVertical ? - (closestVertical.lineGuide + closestVertical.offset) : undefined,
            y: closestHorizontal ? - (closestHorizontal.lineGuide + closestHorizontal.offset) : undefined
          },
          distance: closestVertical?.distance
        }
      }
    }
  }

  public endResize () {
    this._selectedResizerElement = undefined
    this._offset = undefined
    this._resizeDirection = undefined
    this._transform = undefined
    this._boardManager.onEndResizeFlexComponent()
  }

  public onResizing (event: MouseEvent) {
    if (!this._selectedResizerElement || !this._offset) return

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

    const grid = this._boardState.grid
    const coord = this.getMousePosition(event)
    const deltaX = (coord.x - (this._offset.x ?? 0)) / this._boardState.scale
    const deltaY = (coord.y - (this._offset.y ?? 0)) / this._boardState.scale
    const roundedDeltaX = Math.round(deltaX / grid) * grid
    const roundedDeltaY = Math.round(deltaY / grid) * grid

    const params = {
      dimension: {
        roundedDeltaX: 0,
        roundedDeltaY: 0
      },
      position: {
        roundedDeltaX: 0,
        roundedDeltaY: 0
      }
    }

    let snap: OnResizingFlexComponentParams['snap'] | undefined = undefined

    switch (this._resizeDirection) {
      case 'n':
        params.dimension.roundedDeltaY = -roundedDeltaY
        params.position.roundedDeltaY = roundedDeltaY

        snap = this.getSnapByDirection(guides, groupDimensions, params.position, params.dimension)

        break
      case 'ne':
        params.dimension.roundedDeltaY = -roundedDeltaY
        params.dimension.roundedDeltaX = roundedDeltaX
        params.position.roundedDeltaY = roundedDeltaY

        snap = this.getSnapByDirection(guides, groupDimensions, params.position, params.dimension)

        break
      case 'e': {
        params.dimension.roundedDeltaX = roundedDeltaX

        snap = this.getSnapByDirection(guides, groupDimensions, params.position, params.dimension)

        break
      }
      case 'se':
        params.dimension.roundedDeltaX = roundedDeltaX
        params.dimension.roundedDeltaY = roundedDeltaY

        snap = this.getSnapByDirection(guides, groupDimensions, params.position, params.dimension)

        break
      case 's':
        params.dimension.roundedDeltaY = roundedDeltaY

        snap = this.getSnapByDirection(guides, groupDimensions, params.position, params.dimension)

        break
      case 'sw':
        params.dimension.roundedDeltaY = roundedDeltaY
        params.dimension.roundedDeltaX = -roundedDeltaX
        params.position.roundedDeltaX = roundedDeltaX

        snap = this.getSnapByDirection(guides, groupDimensions, params.position, params.dimension)

        break
      case 'w':
        params.dimension.roundedDeltaX = -roundedDeltaX
        params.position.roundedDeltaX = roundedDeltaX

        snap = this.getSnapByDirection(guides, groupDimensions, params.position, params.dimension)

        break
      case 'nw':
        params.dimension.roundedDeltaY = -roundedDeltaY
        params.dimension.roundedDeltaX = -roundedDeltaX
        params.position.roundedDeltaX = roundedDeltaX
        params.position.roundedDeltaY = roundedDeltaY

        snap = this.getSnapByDirection(guides, groupDimensions, params.position, params.dimension)

        break
    }

    this._boardManager.onResizingFlexComponent({
      ...params,
      resizeDirection: this._resizeDirection ?? '',
      snap: snap
    })
  }

  public startResize (event: MouseEvent) {
    const target = event.target as HTMLElement
    const resizerElement = target.closest('.resizer') as HTMLElement | null

    if (resizerElement) {
      this._selectedResizerElement = resizerElement
      this._offset = this.getMousePosition(event)
      this._boardManager.onStartResizeFlexComponent()
      this._resizeDirection = resizerElement.id as ResizeDirection

      const transformStyle = window.getComputedStyle(resizerElement).transform
      this._transform = transformStyle !== 'none' ? new DOMMatrix(transformStyle) : undefined

      if (this._transform) {
        this._offset.x -= this._transform.e
        this._offset.y -= this._transform.f
      }
    }
  }
}
