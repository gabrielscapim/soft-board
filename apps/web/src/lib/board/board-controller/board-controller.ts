import { SoftComponent } from '../../../types'
import { v4 as uuid } from 'uuid'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import {
  BoardControllerInterface,
  OnAddSoftComponentParams,
  OnAlignSoftComponentsParams,
  OnChangeBoardScaleParams,
  OnOrderSoftComponentsParams,
  OnUpdateSoftComponentParams,
  OnUpdateSoftComponentPropertyParams
} from './board-controller-interface.ts'

export type BoardControllerOptions = {
  boardState: BoardState
  boardManager: BoardManager
}

export class BoardController implements BoardControllerInterface {
  private _boardManager: BoardManager
  private _boardState: BoardState

  constructor (options: BoardControllerOptions) {
    this._boardManager = options.boardManager
    this._boardState = options.boardState
  }

  onAddSoftComponent (params: OnAddSoftComponentParams) {
    const { type, name, properties, position } = params

    const zIndex = this._boardState.softComponents.length > 0
      ? Math.max(...this._boardState.softComponents.map(softComponent => softComponent.properties.zIndex ?? 0)) + 1
      : 1

    let screenId: string | null = null

    if (type !== 'mobileScreen') {
      const screenSoftComponent = this._boardState.softComponents.find(softComponent => {
        if (softComponent.type !== 'mobileScreen') return false

        const screenX = softComponent.properties.x
        const screenY = softComponent.properties.y
        const screenWidth = softComponent.properties.width
        const screenHeight = softComponent.properties.height

        return (
          position.x >= screenX &&
          position.x <= screenX + screenWidth &&
          position.y >= screenY &&
          position.y <= screenY + screenHeight
        )
      })

      screenId = screenSoftComponent ? screenSoftComponent.id : null
    }

    const softComponent: SoftComponent = {
      id: uuid(),
      type,
      name,
      screenId,
      properties: {
        ...properties,
        x: position.x,
        y: position.y,
        absolute: true,
        zIndex
      }
    }

    this._boardManager.addSoftComponents({ softComponents: [softComponent] })
  }

  onAlignSoftComponents (params: OnAlignSoftComponentsParams) {
    const { option } = params

    const selected = this._boardState.selectedSoftComponents ?? []
    const softComponents = this._boardState.softComponents.filter(softComponent => selected.includes(softComponent.id))

    if (option === 'left') {
      const minX = Math.min(...softComponents.map(softComponent => softComponent.properties.x))

      softComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              x: minX
            }
          }]
        })
      })
    }

    if (option === 'center') {
      const centerX = Math.min(...softComponents.map(softComponent => softComponent.properties.x + softComponent.properties.width / 2))

      softComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              x: centerX - softComponent.properties.width / 2
            }
          }]
        })
      })
    }

    if (option === 'right') {
      const maxX = Math.max(...softComponents.map(softComponent => softComponent.properties.x + softComponent.properties.width))

      softComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              x: maxX - softComponent.properties.width
            }
          }]
        })
      })
    }

    if (option === 'top') {
      const minY = Math.min(...softComponents.map(softComponent => softComponent.properties.y))

      softComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              y: minY
            }
          }]
        })
      })
    }

    if (option === 'middle') {
      const centerY = Math.min(...softComponents.map(softComponent => softComponent.properties.y + softComponent.properties.height / 2))

      softComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              y: centerY - softComponent.properties.height / 2
            }
          }]
        })
      })
    }

    if (option === 'bottom') {
      const maxY = Math.max(...softComponents.map(softComponent => softComponent.properties.y + softComponent.properties.height))

      softComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              y: maxY - softComponent.properties.height
            }
          }]
        })
      })
    }

    if (option === 'full-width') {
      const minX = Math.min(...softComponents.map(softComponent => softComponent.properties.x))
      const maxX = Math.max(...softComponents.map(softComponent => softComponent.properties.x + softComponent.properties.width))

      softComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              x: minX,
              width: maxX - minX
            }
          }]
        })
      })
    }

    if (option === 'full-height') {
      const minY = Math.min(...softComponents.map(softComponent => softComponent.properties.y))
      const maxY = Math.max(...softComponents.map(softComponent => softComponent.properties.y + softComponent.properties.height))

      softComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              y: minY,
              height: maxY - minY
            }
          }]
        })
      })
    }
  }

  onChangeBoardScale (params: OnChangeBoardScaleParams) {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const newTranslateX = (this._boardState.translate.x - centerX) * (params.scale / this._boardState.scale) + centerX
    const newTranslateY = (this._boardState.translate.y - centerY) * (params.scale / this._boardState.scale) + centerY

    this._boardState.setScale(params.scale)
    this._boardState.setTranslate({ x: newTranslateX, y: newTranslateY })
  }

  onOrderSoftComponents (params: OnOrderSoftComponentsParams) {
    const { option } = params

    const selected = this._boardState.selectedSoftComponents ?? []
    const selectedSoftComponents = this._boardState.softComponents.filter(softComponent => selected.includes(softComponent.id))

    if (option === 'front') {
      const max = Math.max(...this._boardState.softComponents.map(softComponent => softComponent.properties.zIndex ?? 0))
      let currentNewMax = max + 1

      selectedSoftComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              zIndex: softComponent.properties.zIndex === max ? max : currentNewMax
            }
          }]
        })

        currentNewMax += 1
      })
    }

    if (option === 'forward') {
      const nonSelectedSoftComponents = this._boardState.softComponents.filter(softComponent => !selected.includes(softComponent.id))

      selectedSoftComponents.forEach(softComponent => {
        const currentZ = softComponent.properties.zIndex ?? 0
        const candidates = nonSelectedSoftComponents.filter(nonSelectedSoftComponent => (nonSelectedSoftComponent.properties.zIndex ?? 0) > currentZ)

        if (candidates.length > 0) {
          candidates.sort((a, b) => (a.properties.zIndex ?? 0) - (b.properties.zIndex ?? 0))

          const adjacentSoftComponent = candidates[0]

          this._boardManager.updateSoftComponents({
            updatedSoftComponents: [{
              ...softComponent,
              properties: {
                ...softComponent.properties,
                zIndex: adjacentSoftComponent.properties.zIndex
              }
            }]
          })

          this._boardManager.updateSoftComponents({
            updatedSoftComponents: [{
              ...adjacentSoftComponent,
              properties: {
                ...adjacentSoftComponent.properties,
                zIndex: currentZ
              }
            }]
          })
        }
      })
    }

    if (option === 'back') {
      const min = Math.min(...this._boardState.softComponents.map(softComponent => softComponent.properties.zIndex ?? 0))
      let currentNewMin = min - 1

      selectedSoftComponents.forEach(softComponent => {
        this._boardManager.updateSoftComponents({
          updatedSoftComponents: [{
            ...softComponent,
            properties: {
              ...softComponent.properties,
              zIndex: softComponent.properties.zIndex === min ? min : currentNewMin
            }
          }]
        })

        currentNewMin -= 1
      })
    }

    if (option === 'backward') {
      const nonSelectedSoftComponents = this._boardState.softComponents.filter(softComponent => !selected.includes(softComponent.id))

      selectedSoftComponents.forEach(softComponent => {
        const currentZ = softComponent.properties.zIndex ?? 0
        const candidates = nonSelectedSoftComponents.filter(nonSelectedSoftComponent => (nonSelectedSoftComponent.properties.zIndex ?? 0) < currentZ)
        if (candidates.length > 0) {
          candidates.sort((a, b) => (b.properties.zIndex ?? 0) - (a.properties.zIndex ?? 0))

          const adjacentSoftComponent = candidates[0]

          this._boardManager.updateSoftComponents({
            updatedSoftComponents: [{
              ...softComponent,
              properties: {
                ...softComponent.properties,
                zIndex: adjacentSoftComponent.properties.zIndex
              }
            }]
          })

          this._boardManager.updateSoftComponents({
            updatedSoftComponents: [{
              ...adjacentSoftComponent,
              properties: {
                ...adjacentSoftComponent.properties,
                zIndex: currentZ
              }
            }]
          })
        }
      })
    }
  }

  onUpdateSoftComponent (params: OnUpdateSoftComponentParams): void {
    this._boardManager.updateSoftComponents({ updatedSoftComponents: [params.softComponent] })
  }

  onUpdateSoftComponentProperty (params: OnUpdateSoftComponentPropertyParams): void {
      const { id, property, value } = params

      const softComponent = this._boardState.softComponents.find(softComponent => softComponent.id === id)

      if (!softComponent) return

      this._boardManager.updateSoftComponents({
        updatedSoftComponents: [{
          ...softComponent,
          properties: {
            ...softComponent.properties,
            [property]: value
          }
        }]
      })
  }
}
