import Cursor from '/cursor.png'
import { createElement, useMemo, useRef } from 'react'
import { BoardController, BoardManager, BoardState } from '../../lib'
import { AlignmentGuides, ConnectionLines, ResizeBox, SelectionBox } from './subcomponents'
import {
  useBoardTranslate,
  useDraggableFlexBoard,
  useElementResizer,
  useFlexComponents,
  useKeyboardShortcuts,
  useScale,
  useSelectedFlexComponents,
  useSelectionBoard,
  useZoomBoard
} from './hooks'
import { FLEX_COMPONENTS_ELEMENTS, MobileScreenFlexComponent } from '../../flex-components'

export type BoardProps = {
  boardState: BoardState
  boardController: BoardController
  boardManager: BoardManager
  enableZoom?: boolean
  enableSelection?: boolean
  enableResizing?: boolean
  enableDraggable?: boolean
  enableKeyboardShortcuts?: boolean
}

export function Board (props: BoardProps) {
  const {
    boardState,
    boardController,
    boardManager,
    enableZoom = true,
    enableSelection = true,
    enableResizing = true,
    enableDraggable = true,
    enableKeyboardShortcuts = true
  } = props

  const flexBoardContainerRef = useRef<HTMLDivElement>(null)
  const flexBoardRef = useRef<HTMLDivElement>(null)
  const selectionBoxRef = useRef<HTMLDivElement>(null)
  const flexComponents = useFlexComponents(boardState)
  const scale = useScale(boardState)
  const boardTranslate = useBoardTranslate(boardState)
  const selectedFlexComponents = useSelectedFlexComponents(boardState)

  useDraggableFlexBoard(boardState, boardManager, flexBoardContainerRef, enableDraggable)
  useElementResizer(boardState, flexBoardContainerRef, enableResizing)
  useZoomBoard(boardState, flexBoardContainerRef, flexBoardRef, enableZoom)
  useSelectionBoard(boardState, flexBoardContainerRef, selectionBoxRef, enableSelection)
  useKeyboardShortcuts(boardState, boardManager, enableKeyboardShortcuts)

  const screensWithChildren = useMemo(() => {
    const screens = flexComponents.filter(component => component.type === 'mobileScreen')

    return screens.map(screen => {
      const children = flexComponents.filter(c => c.screenId === screen.id)

      return { ...screen, children }
    })
  }, [flexComponents])

  return (
    <div
      id="flex-board-container"
      ref={flexBoardContainerRef}
      className="relative w-full h-full overflow-hidden bg-sidebar"
      style={{
        cursor: `url(${Cursor}) 0 0, auto`
      }}
    >
      <div id="grid" className="absolute w-screen h-screen" />
      <div
        id="flex-board"
        ref={flexBoardRef}
        className="w-0 h-0 absolute z-0"
        style={{ transform: `translate(${boardTranslate.x}px, ${boardTranslate.y}px) scale(${scale})` }}
      >
        {screensWithChildren.map(screen => {
          const children = screen.children

          return (
            <MobileScreenFlexComponent
              key={screen.id}
              component={screen}
              boardController={boardController}
              editable={enableSelection}
            >
              {children
                .filter(child => Boolean(FLEX_COMPONENTS_ELEMENTS[child.type]))
                .map(child => {
                  const relX = child.properties.x - screen.properties.x
                  const relY = child.properties.y - screen.properties.y

                  return createElement(FLEX_COMPONENTS_ELEMENTS[child.type], {
                    key: child.id,
                    component: {
                      ...child,
                      properties: { ...child.properties, x: relX, y: relY }
                    },
                    boardController,
                    editable: enableSelection
                  })
                })}
            </MobileScreenFlexComponent>
          )
        })}

        {screensWithChildren
          .flatMap(screen => screen.children)
          .filter(flexComponent => Boolean(FLEX_COMPONENTS_ELEMENTS[flexComponent.type]))
          .map(flexComponent =>
            createElement(FLEX_COMPONENTS_ELEMENTS[flexComponent.type], {
              key: flexComponent.id,
              component: { ...flexComponent },
              boardController,
              editable: enableSelection
            })
        )}

        {selectedFlexComponents && (enableResizing || enableSelection) && (
          <ResizeBox boardState={boardState} />
        )}
      </div>

      {selectedFlexComponents && (enableSelection || enableResizing) && (
        <AlignmentGuides
          boardState={boardState}
          boardTranslate={boardTranslate}
          scale={scale}
        />
      )}

      <ConnectionLines
        boardState={boardState}
        boardTranslate={boardTranslate}
        scale={scale}
      />

      {enableSelection && <SelectionBox ref={selectionBoxRef} />}
    </div>
  )
}
