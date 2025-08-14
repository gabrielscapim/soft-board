import { RequestHandler } from 'express'
import { chromium } from 'playwright'
import { AUTHENTICATION_COOKIE_NAME, COOKIE_PARSER_SECRET, FRONTEND_BASE_URL, NODE_ENV } from '../../constants'
import { getPool } from '../../libs'
import { ComponentDatabase, TeamDatabase } from 'types/database'
import fs from 'fs'
import path from 'path'
import signature from 'cookie-signature'

type CaptureScreensCommand = {
  boardId: string
}

type Handler = RequestHandler<unknown, unknown, CaptureScreensCommand>

export function handler (): Handler {
  return async (req, res) => {
    const { boardId } = req.body
    const authData = req.auth

    const pool = getPool()

    const team = await pool
      .SELECT<Pick<TeamDatabase, 'slug'>>`slug`
      .FROM`team`
      .WHERE`id = ${req.team?.teamId}`
      .find({ error: 'Team not found' })

    const screens = await pool
      .SELECT<Pick<ComponentDatabase, 'id'>>`id`
      .FROM`component`
      .WHERE`component.board_id = ${boardId}`
      .AND`type = 'mobileScreen'`
      .list()

    const browser = await chromium.launch({
      headless: false,
      args: ['--start-maximized']
    })

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    })

    const signedCookie = 's:' + signature.sign(JSON.stringify(authData), COOKIE_PARSER_SECRET!)

    await context.addCookies([{
      name: AUTHENTICATION_COOKIE_NAME,
      value: signedCookie,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: NODE_ENV === 'production'
    }])

    const page = await context.newPage()

    const url = `${FRONTEND_BASE_URL}/${team.slug}/boards/${boardId}/review`

    await page.goto(url, { waitUntil: 'networkidle' })

    await page.waitForFunction(() => typeof (window as any).__setCurrentScreen === 'function')

    for (const screen of screens) {
      // Call the event listener to set the current screen
      await page.evaluate((scr) => {
        (window as any).__setCurrentScreen(scr.id)
      }, screen)

      await page.waitForTimeout(300)

      // Find the screen element
      const screenContainerLocator = page.locator('[data-testid="screen-container"]')

      if (await screenContainerLocator.count() === 0) {
        continue
      }

      // Scroll the screen element into view
      await screenContainerLocator.scrollIntoViewIfNeeded()

      // Get the dimensions of the screen element
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
        clip: {
          x,
          y,
          width,
          height
        }
      })

      // Save screenshot in the current directory
      const filePath = path.join(process.cwd(), `${screen.id}.png`)

      fs.writeFileSync(filePath, buffer)
    }

    await browser.close()

    res.status(204).end()
  }
}
