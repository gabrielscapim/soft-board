import {
  AddFlexComponentsParams,
  BoardManagerI,
  DeleteFlexComponentsParams,
  OnResizingFlexComponentParams,
  UpdateFlexComponentParams
} from './board-manager-interface'
import { BoardState } from '../board-state'
import { Dimensions, Offset } from '../../../types'

const DISTANCE_TO_BREAK_SNAP = 5

export class BoardManager implements BoardManagerI {
  private _boardState: BoardState
  private _initialFlexComponentProperties: Map<string, Dimensions & Offset> | null

  constructor (boardState: BoardState) {
    this._boardState = boardState
    this._initialFlexComponentProperties = null
  }

  addFlexComponents (params: AddFlexComponentsParams) {
    const { flexComponents } = params

    const prevFlexComponents = this._boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, ...flexComponents]

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(flexComponents.map(flexComponent => flexComponent.id))
  }

  deleteFlexComponents (params: DeleteFlexComponentsParams) {
    const newFlexComponents = this._boardState.flexComponents
      .filter(flexComponent => !params.flexComponents.includes(flexComponent.id))

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(null)
  }

  onEndResizeFlexComponent () {
    this._boardState.setIsResizing(false)
    this._initialFlexComponentProperties = null
  }

  onResizingFlexComponent (params: OnResizingFlexComponentParams) {
    const { dimension, position, snap, resizeDirection } = params
    const selected = this._boardState.selectedFlexComponents

    if (!selected || selected.length === 0 || !this._initialFlexComponentProperties) {
      return
    }

    if (!this._boardState.isResizing) {
      this._boardState.setIsResizing(true)
    }

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
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

  onStartResizeFlexComponent () {
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

  updateFlexComponent (params: UpdateFlexComponentParams) {
    const { updatedFlexComponent } = params

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      if (flexComponent.id === updatedFlexComponent.id) {
        return updatedFlexComponent
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }
}
