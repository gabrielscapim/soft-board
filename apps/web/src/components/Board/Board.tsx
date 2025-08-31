import { useMemo, useRef } from 'react'
import { BoardController, BoardManager, BoardState } from '../../lib'
import { AlignmentGuides, ConnectionLines, MobileScreenBar, ResizeBox, SelectionBox } from './Components'
import {
  useBoardTranslate,
  useDraggableFlexBoard,
  useElementResizer,
  useFlexComponents,
  useIsDragging,
  useIsResizing,
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
  const isDragging = useIsDragging(boardState)
  const isResizing = useIsResizing(boardState)

  useDraggableFlexBoard(boardState, boardManager, flexBoardContainerRef, enableDraggable)
  useElementResizer(boardState, flexBoardContainerRef, enableResizing)
  useZoomBoard(boardState, flexBoardContainerRef, flexBoardRef, enableZoom)
  useSelectionBoard(boardState, flexBoardContainerRef, selectionBoxRef, enableSelection)
  useKeyboardShortcuts(boardState, boardManager, enableKeyboardShortcuts)

  const { screens, componentsByScreenId, rootComponents } = useMemo(() => {
    const screens = []
    const componentsByScreenId: Record<string, typeof flexComponents> = {}
    const rootComponents = []

    for (const component of flexComponents) {
      if (component.type === 'mobileScreen') {
        screens.push(component)
      } else if (component.screenId) {
        if (!componentsByScreenId[component.screenId]) {
          componentsByScreenId[component.screenId] = []
        }

        componentsByScreenId[component.screenId].push(component)
      } else {
        rootComponents.push(component)
      }
    }

    return { screens, componentsByScreenId, rootComponents }
  }, [flexComponents])

  return (
    <div
      id="flex-board-container"
      ref={flexBoardContainerRef}
      className="relative w-full h-full overflow-hidden bg-sidebar"
    >
      <div id="grid" className="absolute w-screen h-screen" />
      <div
        id="flex-board"
        ref={flexBoardRef}
        className="w-0 h-0 absolute z-0"
        style={{ transform: `translate(${boardTranslate.x}px, ${boardTranslate.y}px) scale(${scale})` }}
      >
        {screens.map(screen => {
          const children = componentsByScreenId[screen.id] ?? []

          return (
            <>
              <MobileScreenBar screen={screen} />
              <MobileScreenFlexComponent
                key={screen.id}
                component={screen}
                boardController={boardController}
                editable={enableSelection}
                isDragging={isDragging}
                isResizing={isResizing}
              >
                {children.map(child => {
                  const Element = FLEX_COMPONENTS_ELEMENTS[child.type]

                  if (!Element) return null

                  const relX = child.properties.x - screen.properties.x
                  const relY = child.properties.y - screen.properties.y

                  return (
                    <Element
                      key={child.id}
                      component={{ ...child, properties: { ...child.properties, x: relX, y: relY } }}
                      boardController={boardController}
                      editable={enableSelection}
                      isDragging={isDragging}
                      isResizing={isResizing}
                    />
                  )
                })}
              </MobileScreenFlexComponent>
            </>
          )
        })}

        {rootComponents.map(child => {
          const Element = FLEX_COMPONENTS_ELEMENTS[child.type]

          if (!Element) return null

          return (
            <Element
              key={child.id}
              component={child}
              boardController={boardController}
              editable={enableSelection}
              isDragging={isDragging}
              isResizing={isResizing}
            />
          )
        })}

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
