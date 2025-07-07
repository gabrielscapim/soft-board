import { UUID, FlexComponent } from '../../types'
import { v4 as uuid } from 'uuid'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { BoardControllerInterface, OnAddFlexComponentParams, OnChangeBoardScaleParams, OnUpdateFlexComponentParams } from './board-controller-interface.ts'

/**
 * Class responsible to communicate with the front-end and the BoardManager class.
 * Creating new objects and calling the BoardManager.
 */
export class BoardController implements BoardControllerInterface {
  private _boardManager: BoardManager
  private _boardState: BoardState

  constructor (
    boardState: BoardState = new BoardState()
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState
  }

  onAddFlexComponent (params: OnAddFlexComponentParams) {
    const { type, name, properties, position } = params

    const zIndex = this._boardState.flexComponents.length > 0
      ? Math.max(...this._boardState.flexComponents.map(flexComponent => flexComponent.properties.zIndex ?? 0)) + 1
      : 1

    const flexComponent = {
      id: uuid() as UUID,
      type,
      name,
      properties: {
        ...properties,
        x: position.x,
        y: position.y,
        absolute: true,
        zIndex
      }
    } as FlexComponent

    this._boardManager.addFlexComponents({ flexComponents: [flexComponent] })
  }

  onAlignFlexComponents (option: string) {
    const selected = this._boardState.selectedFlexComponents ?? []
    const flexComponents = this._boardState.flexComponents.filter(flexComponent => selected.includes(flexComponent.id))

    if (option === 'left') {
      const minX = Math.min(...flexComponents.map(flexComponent => flexComponent.properties.x))

      flexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              x: minX
            }
          }
        })
      })
    }

    if (option === 'center') {
      const centerX = Math.min(...flexComponents.map(flexComponent => flexComponent.properties.x + flexComponent.properties.width / 2))

      flexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              x: centerX - flexComponent.properties.width / 2
            }
          }
        })
      })
    }

    if (option === 'right') {
      const maxX = Math.max(...flexComponents.map(flexComponent => flexComponent.properties.x + flexComponent.properties.width))

      flexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              x: maxX - flexComponent.properties.width
            }
          }
        })
      })
    }

    if (option === 'top') {
      const minY = Math.min(...flexComponents.map(flexComponent => flexComponent.properties.y))

      flexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              y: minY
            }
          }
        })
      })
    }

    if (option === 'middle') {
      const centerY = Math.min(...flexComponents.map(flexComponent => flexComponent.properties.y + flexComponent.properties.height / 2))

      flexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              y: centerY - flexComponent.properties.height / 2
            }
          }
        })
      })
    }

    if (option === 'bottom') {
      const maxY = Math.max(...flexComponents.map(flexComponent => flexComponent.properties.y + flexComponent.properties.height))

      flexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              y: maxY - flexComponent.properties.height
            }
          }
        })
      })
    }

    if (option === 'full-width') {
      const minX = Math.min(...flexComponents.map(flexComponent => flexComponent.properties.x))
      const maxX = Math.max(...flexComponents.map(flexComponent => flexComponent.properties.x + flexComponent.properties.width))

      flexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              x: minX,
              width: maxX - minX
            }
          }
        })
      })
    }

    if (option === 'full-height') {
      const minY = Math.min(...flexComponents.map(flexComponent => flexComponent.properties.y))
      const maxY = Math.max(...flexComponents.map(flexComponent => flexComponent.properties.y + flexComponent.properties.height))

      flexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              y: minY,
              height: maxY - minY
            }
          }
        })
      })
    }
  }

  onChangeBoardScale (params: OnChangeBoardScaleParams) {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const newTranslateX = (this._boardState.translate.x - centerX) * (params.scale / this._boardState.scale) + centerX
    const newTranslateY = (this._boardState.translate.y - centerY) * (params.scale / this._boardState.scale) + centerY

    this._boardManager.onScaleChange({ scale: params.scale })
    this._boardManager.onTranslateBoard({ translateX: newTranslateX, translateY: newTranslateY })
  }

  onOrderFlexComponents (option: string) {
    const selected = this._boardState.selectedFlexComponents ?? []
    const selectedFlexComponents = this._boardState.flexComponents.filter(flexComponent => selected.includes(flexComponent.id))

    if (option === 'front') {
      const max = Math.max(...this._boardState.flexComponents.map(flexComponent => flexComponent.properties.zIndex ?? 0))
      let currentNewMax = max + 1

      selectedFlexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              zIndex: flexComponent.properties.zIndex === max ? max : currentNewMax
            }
          }
        })

        currentNewMax += 1
      })
    }

    if (option === 'forward') {
      const nonSelectedFlexComponents = this._boardState.flexComponents.filter(flexComponent => !selected.includes(flexComponent.id))

      selectedFlexComponents.forEach(flexComponent => {
        const currentZ = flexComponent.properties.zIndex ?? 0
        const candidates = nonSelectedFlexComponents.filter(nonSelectedFlexComponent => (nonSelectedFlexComponent.properties.zIndex ?? 0) > currentZ)

        if (candidates.length > 0) {
          candidates.sort((a, b) => (a.properties.zIndex ?? 0) - (b.properties.zIndex ?? 0))

          const adjacentFlexComponent = candidates[0]

          this._boardManager.updateFlexComponent({
            updatedFlexComponent: {
              ...flexComponent,
              properties: {
                ...flexComponent.properties,
                zIndex: adjacentFlexComponent.properties.zIndex
              }
            }
          })

          this._boardManager.updateFlexComponent({
            updatedFlexComponent: {
              ...adjacentFlexComponent,
              properties: {
                ...adjacentFlexComponent.properties,
                zIndex: currentZ
              }
            }
          })
        }
      })
    }

    if (option === 'back') {
      const min = Math.min(...this._boardState.flexComponents.map(flexComponent => flexComponent.properties.zIndex ?? 0))
      let currentNewMin = min - 1

      selectedFlexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              zIndex: flexComponent.properties.zIndex === min ? min : currentNewMin
            }
          }
        })

        currentNewMin -= 1
      })
    }

    if (option === 'backward') {
      const nonSelectedFlexComponents = this._boardState.flexComponents.filter(flexComponent => !selected.includes(flexComponent.id))

      selectedFlexComponents.forEach(flexComponent => {
        const currentZ = flexComponent.properties.zIndex ?? 0
        const candidates = nonSelectedFlexComponents.filter(nonSelectedFlexComponent => (nonSelectedFlexComponent.properties.zIndex ?? 0) < currentZ)

        if (candidates.length > 0) {
          candidates.sort((a, b) => (b.properties.zIndex ?? 0) - (a.properties.zIndex ?? 0))

          const adjacentFlexComponent = candidates[0]

          this._boardManager.updateFlexComponent({
            updatedFlexComponent: {
              ...flexComponent,
              properties: {
                ...flexComponent.properties,
                zIndex: adjacentFlexComponent.properties.zIndex
              }
            }
          })

          this._boardManager.updateFlexComponent({
            updatedFlexComponent: {
              ...adjacentFlexComponent,
              properties: {
                ...adjacentFlexComponent.properties,
                zIndex: currentZ
              }
            }
          })
        }
      })
    }
  }

  onUpdateFlexComponent (params: OnUpdateFlexComponentParams): void {
    this._boardManager.updateFlexComponent({ updatedFlexComponent: params.flexComponent })
  }
}
