import { chromium } from '@playwright/test'
import signature from 'cookie-signature'
import { DatabasePool } from 'pg-script'
import { ComponentDatabase } from 'types/database'
import { AuthenticationData } from '../../../../types'
import {
  API_BASE_URL,
  AUTHENTICATION_COOKIE_NAME,
  COOKIE_PARSER_SECRET,
  FRONTEND_BASE_URL,
  NODE_ENV
} from '../../../../constants'
import { logger } from '../../../../libs'

type CaptureScreensCommand = {
  pool: DatabasePool
  user: { id: string }
  board: { id: string }
  team: { slug: string }
}

type CaptureScreensResult = { screenBuffers: Buffer<ArrayBufferLike>[] | null }

export async function captureScreens (
  command: CaptureScreensCommand
): Promise<CaptureScreensResult> {
  const { pool, user, board, team } = command

  const screens = await pool
    .SELECT<Pick<ComponentDatabase, 'id'>>`id`
    .FROM`component`
    .WHERE`component.board_id = ${board.id}`
    .AND`type = 'mobileScreen'`
    .list()

  if (screens.length === 0) {
    return { screenBuffers: null }
  }

  const screenBuffers: Buffer<ArrayBufferLike>[] = []

  const browser = await chromium.launch({
    headless: true,
    args: ['--start-maximized']
  })

  const browserContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  })

  const authData: AuthenticationData = {
    userId: user.id
  }

  const signedCookie = 's:' + signature.sign(JSON.stringify(authData), COOKIE_PARSER_SECRET!)
  const apiUrl = new URL(API_BASE_URL)
  const frontendUrl = new URL(`/${team.slug}/boards/${board.id}/review`, FRONTEND_BASE_URL)

  const domain = apiUrl.hostname
  const cookie: Parameters<typeof browserContext.addCookies>[0][0] = {
    name: AUTHENTICATION_COOKIE_NAME,
    value: signedCookie,
    domain: apiUrl.hostname,
    path: '/',
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: NODE_ENV === 'production' ? 'None' : 'Lax'
  }

  logger.info({ domain }, 'Setting authentication cookie for review wireflow capture')

  await browserContext.addCookies([cookie])

  const page = await browserContext.newPage()

  await page.goto(frontendUrl.toString(), { waitUntil: 'networkidle' })
  await page.waitForFunction(
    () => typeof (window as any).__setCurrentScreen === 'function'
  )

  for (const screen of screens) {
    await page.evaluate(scr => {
      (window as any).__setCurrentScreen(scr.id)
    }, screen)

    await page.waitForTimeout(300)

    const screenContainerLocator = page.locator('[data-testid="screen-container"]')

    if (await screenContainerLocator.count() === 0) {
      continue
    }

    await screenContainerLocator.scrollIntoViewIfNeeded()

    const { x, y, width, height } = await screenContainerLocator.evaluate(element => {
      const rect = element.getBoundingClientRect()

      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      }
    })

    const buffer = await page.screenshot({
      clip: { x, y, width, height }
    })

    screenBuffers.push(buffer)
  }

  await browser.close()

  return { screenBuffers }
}
