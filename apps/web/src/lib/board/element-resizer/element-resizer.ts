import { Dimensions, FlexComponent, Guide, Offset, ResizeDirection } from '../../../types'
import { BoardState } from '../board-state'
import { getAlignmentBoardGuides } from '../get-alignment-board-guides'
import { OnResizingFlexComponentParams } from './types'

const DISTANCE_TO_BREAK_SNAP = 5

export class ElementResizer {
  private _boardElement: HTMLElement
  private _boardState: BoardState
  private _initialFlexComponentProperties: Map<string, Dimensions & Offset> | null = null
  private _offset: Offset | undefined
  private _resizeDirection: ResizeDirection | undefined
  private _selectedResizerElement: HTMLElement | undefined
  private _transform: DOMMatrix | undefined

  constructor (
    boardState: BoardState,
    boardElement: HTMLElement
  ) {
    this._boardState = boardState
    this._boardElement = boardElement

    this.startResize = this.startResize.bind(this)
    this.onResizing = this.onResizing.bind(this)
    this.endResize = this.endResize.bind(this)
  }

  private getClosestGuide (guides: Guide[], target: number): Guide | undefined {
    let closestGuide: Guide | undefined = undefined

    guides.forEach(guide => {
      if (!closestGuide) {
        closestGuide = guide
      } else {
        if (Math.abs(guide.lineGuide - target) < Math.abs(closestGuide.lineGuide - target)) {
          closestGuide = guide
        }
      }
    })

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
            y: closestHorizontal ? closestHorizontal.lineGuide + closestHorizontal.offset : undefined
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

  private onEndResizeFlexComponent () {
    this._boardState.setIsResizing(false)
    this._initialFlexComponentProperties = null
  }

  private onResizingFlexComponent (params: OnResizingFlexComponentParams) {
    const { dimension, position, snap, resizeDirection } = params
    const selected = this._boardState.selectedFlexComponents

    if (!selected || selected.length === 0 || !this._initialFlexComponentProperties) {
      return
    }

    if (!this._boardState.isResizing) {
      this._boardState.setIsResizing(true)
    }

    const newFlexComponents = this._boardState.flexComponents.map<FlexComponent>(flexComponent => {
      if (selected.includes(flexComponent.id)) {
        const initialProps = this._initialFlexComponentProperties?.get(flexComponent.id)

        if (!initialProps) return flexComponent

        let finalX = initialProps.x + position.roundedDeltaX
        let finalY = initialProps.y + position.roundedDeltaY
        let finalWidth = initialProps.width + dimension.roundedDeltaX
        let finalHeight = initialProps.height + dimension.roundedDeltaY

        switch (resizeDirection) {
          case 'n': {
            if (snap?.position?.y !== undefined) {
              const snapDeltaY = snap.position.y - initialProps.y
              if (Math.abs(finalY - snap.position.y) < DISTANCE_TO_BREAK_SNAP) {
                finalY = snap.position.y
                finalHeight = initialProps.height - snapDeltaY
              }
            }
            break
          }
          case 'ne': {
            if (snap?.position?.y !== undefined) {
              const snapDeltaY = snap.position.y - initialProps.y
              if (Math.abs(finalY - snap.position.y) < DISTANCE_TO_BREAK_SNAP) {
                finalY = snap.position.y
                finalHeight = initialProps.height - snapDeltaY
              }
            }

            if (snap?.dimension?.x !== undefined) {
              const snapWidth = snap.dimension.x - initialProps.x
              if (Math.abs(finalWidth - snapWidth) < DISTANCE_TO_BREAK_SNAP) {
                finalWidth = snapWidth
              }
            }
            break
          }
          case 'e': {
            if (snap?.dimension?.x !== undefined) {
              const snapWidth = snap.dimension.x - initialProps.x
              if (Math.abs(finalWidth - snapWidth) < DISTANCE_TO_BREAK_SNAP) {
                finalWidth = snapWidth
              }
            }
            break
          }
          case 'se': {
            if (snap?.dimension?.x !== undefined) {
              const snapWidth = snap.dimension.x - initialProps.x
              if (Math.abs(finalWidth - snapWidth) < DISTANCE_TO_BREAK_SNAP) {
                finalWidth = snapWidth
              }
            }

            if (snap?.dimension?.y !== undefined) {
              const snapHeight = snap.dimension.y - initialProps.y
              if (Math.abs(finalHeight - snapHeight) < DISTANCE_TO_BREAK_SNAP) {
                finalHeight = snapHeight
              }
            }
            break
          }
          case 's': {
            if (snap?.dimension?.y !== undefined) {
              const snapHeight = snap.dimension.y - initialProps.y
              if (Math.abs(finalHeight - snapHeight) < DISTANCE_TO_BREAK_SNAP) {
                finalHeight = snapHeight
              }
            }
            break
          }
          case 'sw': {
            if (snap?.position?.x !== undefined) {
              const snapDeltaX = snap.position.x - initialProps.x
              if (Math.abs(finalX - snap.position.x) < DISTANCE_TO_BREAK_SNAP) {
                finalX = snap.position.x
                finalWidth = initialProps.width - snapDeltaX
              }
            }

            if (snap?.dimension?.y !== undefined) {
              const snapHeight = snap.dimension.y - initialProps.y
              if (Math.abs(finalHeight - snapHeight) < DISTANCE_TO_BREAK_SNAP) {
                finalHeight = snapHeight
              }
            }
            break
          }
          case 'w': {
            if (snap?.position?.x !== undefined) {
              const snapDeltaX = snap.position.x - initialProps.x
              if (Math.abs(finalX - snap.position.x) < DISTANCE_TO_BREAK_SNAP) {
                finalX = snap.position.x
                finalWidth = initialProps.width - snapDeltaX
              }
            }
            break
          }
          case 'nw': {
            if (snap?.position?.x !== undefined) {
              const snapDeltaX = snap.position.x - initialProps.x
              if (Math.abs(finalX - snap.position.x) < DISTANCE_TO_BREAK_SNAP) {
                finalX = snap.position.x
                finalWidth = initialProps.width - snapDeltaX
              }
            }

            if (snap?.position?.y !== undefined) {
              const snapDeltaY = snap.position.y - initialProps.y
              if (Math.abs(finalY - snap.position.y) < DISTANCE_TO_BREAK_SNAP) {
                finalY = snap.position.y
                finalHeight = initialProps.height - snapDeltaY
              }
            }
            break
          }
        }

        return {
          ...flexComponent,
          screenId: params.screenId,
          properties: {
            ...flexComponent.properties,
            x: finalX,
            y: finalY,
            width: finalWidth,
            height: finalHeight
          }
        }
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(selected)
  }

  private onStartResizeFlexComponent () {
    const selected = this._boardState.selectedFlexComponents

    if (!selected || selected.length === 0) {
      return
    }

    const initialProperties = new Map<string, Dimensions & Offset>()

    for (const id of selected) {
      const selectedFlexComponent = this._boardState.flexComponents.find(flexComponent => flexComponent.id === id)

      if (selectedFlexComponent) {
        initialProperties.set(id, {
          width: selectedFlexComponent.properties.width,
          height: selectedFlexComponent.properties.height,
          x: selectedFlexComponent.properties.x,
          y: selectedFlexComponent.properties.y
        })
      }
    }

    this._initialFlexComponentProperties = initialProperties
  }

  public endResize () {
    this._selectedResizerElement = undefined
    this._offset = undefined
    this._resizeDirection = undefined
    this._transform = undefined
    this.onEndResizeFlexComponent()
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

    this._boardState.setGuides({
      horizontal: guides.horizontal.filter(guide => guide.diff <= 1),
      vertical: guides.vertical.filter(guide => guide.diff <= 1)
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

    const futureGroup = {
      x: groupDimensions.x + params.position.roundedDeltaX,
      y: groupDimensions.y + params.position.roundedDeltaY,
      width: groupDimensions.width + params.dimension.roundedDeltaX,
      height: groupDimensions.height + params.dimension.roundedDeltaY
    }

    let screenId: string | null = null

    const screens = this._boardState.flexComponents.filter(component => component.type === 'mobileScreen')

    const TOLERANCE = -25

    for (const screen of screens) {
      const outside =
        futureGroup.x + futureGroup.width  < screen.properties.x - TOLERANCE ||
        futureGroup.x > screen.properties.x + screen.properties.width + TOLERANCE ||
        futureGroup.y + futureGroup.height < screen.properties.y - TOLERANCE ||
        futureGroup.y > screen.properties.y + screen.properties.height + TOLERANCE

      if (!outside) {
        screenId = screen.id
        break
      }
    }

    this.onResizingFlexComponent({
      ...params,
      resizeDirection: this._resizeDirection ?? '',
      snap: snap,
      screenId
    })
  }

  public startResize (event: MouseEvent) {
    const target = event.target as HTMLElement
    const resizerElement = target.closest('.resizer') as HTMLElement | null

    if (resizerElement) {
      this._selectedResizerElement = resizerElement
      this._offset = this.getMousePosition(event)
      this.onStartResizeFlexComponent()
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
