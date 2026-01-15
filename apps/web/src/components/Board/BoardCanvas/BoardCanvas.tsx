import { Fragment, useMemo, useRef } from 'react'
import { BoardController, BoardManager, BoardState } from '../../../lib'
import { AlignmentGuides, ConnectionLines, MobileScreenBar, ResizeBox, SelectionBox } from './components'
import {
  useBoardStore,
  useDraggableSoftBoard,
  useElementResizer,
  useKeyboardShortcuts,
  useSelectionBoard,
  useZoomBoard
} from './hooks'
import { SOFT_COMPONENTS_ELEMENTS, MobileScreenSoftComponent } from '../../../flex-components'
import { TUTORIALS_ANCHORS } from '@/tutorials'

export type BoardCanvasProps = {
  boardState: BoardState
  boardController: BoardController
  boardManager: BoardManager
  enableZoom?: boolean
  enableSelection?: boolean
  enableResizing?: boolean
  enableDraggable?: boolean
  enableKeyboardShortcuts?: boolean
}

export function BoardCanvas (props: BoardCanvasProps) {
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

  const softBoardContainerRef = useRef<HTMLDivElement>(null)
  const softBoardRef = useRef<HTMLDivElement>(null)
  const selectionBoxRef = useRef<HTMLDivElement>(null)
  const softComponents = useBoardStore(boardState, 'softComponentsChanged', state => state.softComponents)
  const scale = useBoardStore(boardState, 'scaleChanged', state => state.scale)
  const boardTranslate = useBoardStore(boardState, 'translateChanged', state => state.translate)
  const selectedSoftComponents = useBoardStore(boardState, 'selectedSoftComponentsChanged', state => state.selectedSoftComponents)
  const isDragging = useBoardStore(boardState, 'isDraggingChanged', state => state.isDragging)
  const isResizing = useBoardStore(boardState, 'isResizingChanged', state => state.isResizing)

  useDraggableSoftBoard(boardState, boardManager, softBoardContainerRef, enableDraggable)
  useElementResizer(boardState, boardManager, softBoardContainerRef, enableResizing)
  useZoomBoard(boardState, softBoardContainerRef, softBoardRef, enableZoom)
  useSelectionBoard(boardState, softBoardContainerRef, selectionBoxRef, enableSelection)
  useKeyboardShortcuts(boardState, boardManager, enableKeyboardShortcuts)

  const { screens, componentsByScreenId, rootComponents } = useMemo(() => {
    const screens = []
    const componentsByScreenId: Record<string, typeof softComponents> = {}
    const rootComponents = []

    for (const component of softComponents) {
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
  }, [softComponents])

  return (
    <div
      id="soft-board-container"
      data-tutorial={TUTORIALS_ANCHORS.Board}
      ref={softBoardContainerRef}
      className="relative w-full h-full overflow-hidden bg-sidebar"
    >
      <div id="grid" className="absolute w-screen h-screen" />
      <div
        id="soft-board"
        ref={softBoardRef}
        className="w-0 h-0 absolute z-0"
        style={{ transform: `translate(${boardTranslate.x}px, ${boardTranslate.y}px) scale(${scale})` }}
      >
        {screens.map(screen => {
          const children = componentsByScreenId[screen.id] ?? []

          return (
            <Fragment key={screen.id}>
              <MobileScreenBar screen={screen} />
              <MobileScreenSoftComponent
                component={screen}
                boardController={boardController}
                editable={enableSelection}
                isDragging={isDragging}
                isResizing={isResizing}
              >
                {children.map(child => {
                  const Element = SOFT_COMPONENTS_ELEMENTS[child.type]

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
              </MobileScreenSoftComponent>
            </Fragment>
          )
        })}

        {rootComponents.map(child => {
          const Element = SOFT_COMPONENTS_ELEMENTS[child.type]

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

        {selectedSoftComponents && (enableResizing || enableSelection) && (
          <ResizeBox boardState={boardState} />
        )}
      </div>

      {selectedSoftComponents && (enableSelection || enableResizing) && (
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
