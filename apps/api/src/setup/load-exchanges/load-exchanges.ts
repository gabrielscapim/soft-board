import fs from 'fs'
import path from 'path'
import { Consumer, Exchange } from '../../types'

const EXCHANGES = [
  {
    name: 'agent.calledFunction',
    type: 'topic'
  },
  {
    name: 'user.signedIn',
    type: 'fanout'
  },
  {
    name: 'user.signedOut',
    type: 'fanout'
  }
] as const

export type ExchangeName = typeof EXCHANGES[number]['name']

type Module = {
  exchange?: ExchangeName
  key?: string
  consumer?: Consumer
}

export async function loadExchanges (consumersDir: string): Promise<Exchange[]> {
  const exchanges: Exchange[] = []

  const consumerDirs = (await fs.promises.readdir(consumersDir, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const consumerDir of consumerDirs) {
    const module: Module = await import(path.join(consumersDir, consumerDir))

    if (typeof module.exchange !== 'string' || typeof module.consumer !== 'function') {
      throw new Error(`Module ${consumerDir} does not export a valid exchange or consumer function`)
    }

    const exchange = EXCHANGES.find(exchange => exchange.name === module.exchange)

    if (!exchange) {
      throw new Error(`Exchange ${module.exchange} not found`)
    }

    const consumerExchange = exchanges.find(item => item.name === exchange.name)

    if (consumerExchange) {
      consumerExchange.bindings.push({
        name: consumerDir,
        key: module.key ?? '',
        consumer: module.consumer
      })
    } else {
      exchanges.push({
        name: exchange.name,
        type: exchange.type,
        bindings: [{
          name: consumerDir,
          key: module.key ?? '',
          consumer: module.consumer
        }]
      })
    }
  }

  return exchanges
}
