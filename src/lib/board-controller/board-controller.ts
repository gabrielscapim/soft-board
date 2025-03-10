import { UUID } from '../../types/common/uuid.ts'
import { ButtonFlexComponent, DividerFlexComponent, InputFlexComponent, MobileScreenFlexComponent, RectangleFlexComponent, SelectFlexComponent, TextFlexComponent } from '../../types/index.ts'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { v4 as uuid } from 'uuid'
import { BoardControllerInterface, OnAddFlexComponentParams, OnChangeBoardScaleParams, OnUpdateFlexComponentParams } from './board-controller-interface.ts'

/**
 * Class responsible to communicate with the front-end and the BoardManager class.
 * Creating new objects and calling the BoardManager.
 */
export class BoardController implements BoardControllerInterface {
  private _boardManager: BoardManager
  private _boardState: BoardState

  constructor (
    boardState: BoardState,
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState
  }

  onAddFlexComponent (params: OnAddFlexComponentParams) {
    const { type, position } = params

    const zIndex = this._boardState.flexComponents.length > 0
      ? Math.max(...this._boardState.flexComponents.map(flexComponent => flexComponent.properties.zIndex ?? 0)) + 1
      : 1

    if (type === 'button') {
      const button: ButtonFlexComponent = {
        id: uuid() as UUID,
        name: 'Button',
        type: 'button',
        properties: {
          x: position.x,
          y: position.y,
          width: 100,
          height: 48,
          rx: 10,
          ry: 10,
          zIndex
        }
      }

      return this._boardManager.addFlexComponents({ flexComponents: [button] })
    }

    if (type === 'divider') {
      const divider: DividerFlexComponent = {
        id: uuid() as UUID,
        name: 'Divider',
        type: 'divider',
        properties: {
          x: position.x,
          y: position.y,
          width: 300,
          height: 4,
          zIndex
        }
      }

      return this._boardManager.addFlexComponents({ flexComponents: [divider] })
    }

    if (type === 'input') {
      const input: InputFlexComponent = {
        id: uuid() as UUID,
        name: 'Input',
        type: 'input',
        properties: {
          x: position.x,
          y: position.y,
          width: 200,
          height: 48,
          rx: 10,
          ry: 10,
          zIndex
        }
      }

      return this._boardManager.addFlexComponents({ flexComponents: [input] })
    }

    if (type === 'mobileScreen') {
      const mobileScreen: MobileScreenFlexComponent = {
        id: uuid() as UUID,
        name: 'Mobile Screen',
        type: 'mobileScreen',
        properties: {
          x: position.x,
          y: position.y,
          width: 375,
          height: 812,
          zIndex
        }
      }

      return this._boardManager.addFlexComponents({ flexComponents: [mobileScreen] })
    }

    if (type === 'select') {
      const select: SelectFlexComponent = {
        id: uuid() as UUID,
        name: 'Select',
        type: 'select',
        properties: {
          x: position.x,
          y: position.y,
          width: 200,
          height: 48,
          rx: 10,
          ry: 10,
          zIndex
        }
      }

      return this._boardManager.addFlexComponents({ flexComponents: [select] })
    }

    if (type === 'text') {
      const text: TextFlexComponent = {
        id: uuid() as UUID,
        name: 'Text',
        type: 'text',
        properties: {
          x: position.x,
          y: position.y,
          width: 200,
          height: 24,
          text: 'Text',
          fontSize: 16,
          zIndex
        }
      }

      return this._boardManager.addFlexComponents({ flexComponents: [text] })
    }

    const rectangle: RectangleFlexComponent = {
      id: uuid() as UUID,
      name: 'Rectangle',
      type: 'rectangle',
      properties: {
        x: position.x,
        y: position.y,
        width: 150,
        height: 100,
        rx: 10,
        ry: 10,
        zIndex
      }
    }

    this._boardManager.addFlexComponents({ flexComponents: [rectangle] })
  }

  onAlignComponents (option: string) {
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

      selectedFlexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              zIndex: flexComponent.properties.zIndex === max ? max : max + 1
            }
          }
        })
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

      selectedFlexComponents.forEach(flexComponent => {
        this._boardManager.updateFlexComponent({
          updatedFlexComponent: {
            ...flexComponent,
            properties: {
              ...flexComponent.properties,
              zIndex: flexComponent.properties.zIndex === min ? min : min - 1
            }
          }
        })
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
