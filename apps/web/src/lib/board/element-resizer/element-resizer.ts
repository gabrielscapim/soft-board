import { SOFT_COMPONENT_MIN_DIMENSIONS } from '@/flex-components'
import { Dimensions, SoftComponent, Guide, Offset, ResizeDirection } from '../../../types'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { getAlignmentBoardGuides } from '../get-alignment-board-guides'
import { OnResizingSoftComponentParams } from './types'

const DISTANCE_TO_BREAK_SNAP = 5
const MIN_DISTANCE_TO_RESIZE = 0.5

export type ElementResizerOptions = {
  boardElement: HTMLElement
  boardState: BoardState
  boardManager: BoardManager
}

type InitialProperties = Map<string, Dimensions & Offset & { screenId?: string | null }>

export class ElementResizer {
  private _boardElement: HTMLElement
  private _boardState: BoardState
  private _boardManager: BoardManager
  private _hasDragged: boolean = false
  private _initialProperties: InitialProperties | null = null
  private _offset: Offset | undefined
  private _resizeDirection: ResizeDirection | undefined
  private _selectedResizerElement: HTMLElement | undefined
  private _transform: DOMMatrix | undefined

  constructor (options: ElementResizerOptions) {
    this._boardState = options.boardState
    this._boardElement = options.boardElement
    this._boardManager = options.boardManager

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

  private getGroupDimensions (selectedComponents: SoftComponent[]) {
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

  private onEndResizeSoftComponent () {
    const selectedIds = this._boardState.selectedSoftComponents ?? []
    const selectedComponents = this._boardState.softComponents.filter(softComponent => selectedIds.includes(softComponent.id))

    if (selectedComponents.length && this._hasDragged) {
      this._boardManager.updateSoftComponents({
        updatedSoftComponents: selectedComponents,
        initialProperties: this._initialProperties
      })
    }

    this._boardState.setIsResizing(false)
    this._initialProperties = null
  }

  private onResizingSoftComponent (params: OnResizingSoftComponentParams) {
    const { dimension, position, snap, resizeDirection } = params

    const selected = new Set(this._boardState.selectedSoftComponents)

    if (!selected || selected.size === 0 || !this._initialProperties) {
      return
    }

    if (!this._boardState.isResizing) {
      this._boardState.setIsResizing(true)
    }

    const selectedSoftComponents = this._boardState.softComponents.filter(softComponent => selected.has(softComponent.id))
    const isResizingMobileScreen = selectedSoftComponents.some(component => component.type === 'mobileScreen')

    const newSoftComponents = this._boardState.softComponents.map<SoftComponent>(softComponent => {
      // When a mobile screen is being resized, only resize the mobile screen
      if (isResizingMobileScreen && softComponent.type !== 'mobileScreen') {
        return softComponent
      }

      if (selected.has(softComponent.id)) {
        const initialProps = this._initialProperties?.get(softComponent.id)

        if (!initialProps) return softComponent

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

        const minDimensions = SOFT_COMPONENT_MIN_DIMENSIONS[softComponent.type]

        return {
          ...softComponent,
          screenId: params.screenId,
          properties: {
            ...softComponent.properties,
            x: finalX,
            y: finalY,
            width: minDimensions ? Math.max(finalWidth, minDimensions.width) : finalWidth,
            height: minDimensions ? Math.max(finalHeight, minDimensions.height) : finalHeight
          }
        }
      }

      return softComponent
    })

    this._boardState.setSoftComponents(newSoftComponents)
    this._boardState.setSelectedSoftComponents(Array.from(selected))
  }

  private onStartResizeSoftComponent () {
    const selected = this._boardState.selectedSoftComponents

    if (!selected || selected.length === 0) {
      return
    }

    const initialProperties = new Map<string, Dimensions & Offset & { screenId?: string | null }>()

    for (const id of selected) {
      const selectedSoftComponent = this._boardState.softComponents.find(softComponent => softComponent.id === id)

      if (selectedSoftComponent) {
        initialProperties.set(id, structuredClone({
          width: selectedSoftComponent.properties.width,
          height: selectedSoftComponent.properties.height,
          x: selectedSoftComponent.properties.x,
          y: selectedSoftComponent.properties.y,
          screenId: selectedSoftComponent.screenId
        }))
      }
    }

    this._initialProperties = initialProperties
  }

  public endResize () {
    this._selectedResizerElement = undefined
    this._offset = undefined
    this._resizeDirection = undefined
    this._transform = undefined
    this.onEndResizeSoftComponent()
  }

  public onResizing (event: MouseEvent) {
    if (!this._selectedResizerElement || !this._offset) return

    event.preventDefault()

    const selected = this._boardState.selectedSoftComponents ?? []
    const selectedComponents = this._boardState.softComponents.filter(softComponent => selected.includes(softComponent.id))

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
      softComponents: this._boardState.softComponents,
      dragging: compositeDragging,
      selectedSoftComponents: selected
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

    if (Math.abs(deltaX) > MIN_DISTANCE_TO_RESIZE || Math.abs(deltaY) > MIN_DISTANCE_TO_RESIZE) {
      this._hasDragged = true
    }

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

    let snap: OnResizingSoftComponentParams['snap'] | undefined = undefined

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

    const screens = this._boardState.softComponents.filter(component => component.type === 'mobileScreen')

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

    this.onResizingSoftComponent({
      ...params,
      resizeDirection: this._resizeDirection ?? '',
      snap: snap,
      screenId
    })
  }

  public startResize (event: MouseEvent) {
    const target = event.target as HTMLElement
    const resizerElement = target.closest('.resizer') as HTMLElement | null

    this._hasDragged = false

    if (resizerElement) {
      this._selectedResizerElement = resizerElement
      this._offset = this.getMousePosition(event)
      this.onStartResizeSoftComponent()
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
