import fs from 'fs'
import path from 'path'
import { Endpoint } from '../types'

export async function loadEndpoints (rootDir: string): Promise<Endpoint[]> {
  const result = []

  const dirs = (await fs.promises.readdir(rootDir, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const dir of dirs) {
    const module = await import(path.join(rootDir, dir))

    if (typeof module.handler !== 'function') {
      throw new Error(`Module ${dir} does not export a handler function`)
    }

    const endpoint: Endpoint = {
      auth: module.auth,
      method: module.method ?? 'post',
      path: `/${dir}`,
      handler: module.handler
    }

    result.push(endpoint)
  }

  return result
}
