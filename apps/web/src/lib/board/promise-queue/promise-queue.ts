type PromiseFn = () => Promise<void>

export class PromiseQueue {
  private queue: PromiseFn[] = []

  constructor () {
    this.queue = []
  }

  private executeNext (): void {
    const next = this.queue.shift()

    if (!next) {
      return
    }

    next()
      .then(() => this.executeNext())
      .catch(error => console.error('Error executing action:', error))
  }

  public run (action: PromiseFn): void {
    if (this.queue.length === 0) {
      action()
        .then(() => this.executeNext())
        .catch(error => console.error('Error executing action:', error))
    } else {
      this.queue.push(action)
    }
  }
}
