export type Command = {
  do(): Promise<void> | void
  undo(): Promise<void> | void
}

export class CommandManager {
  private undoStack: Command[] = []
  private redoStack: Command[] = []

  execute (command: Command) {
    command.do()
    this.undoStack.push(command)
    this.redoStack = []
  }

  undo () {
    const command = this.undoStack.pop()

    if (!command) return

    command.undo()
    this.redoStack.push(command)
  }

  redo () {
    const command = this.redoStack.pop()

    if (!command) return

    command.do()
    this.undoStack.push(command)
  }
}
