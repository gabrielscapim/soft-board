import { ComponentDatabase } from 'types/database'
import { AgentContext, RunToolResult, Tool } from '../core'
import { chromium } from '@playwright/test'
import { COOKIE_PARSER_SECRET, AUTHENTICATION_COOKIE_NAME, NODE_ENV, FRONTEND_BASE_URL } from '../../../../constants'
import signature from 'cookie-signature'
import { AuthenticationData } from '../../../../types'
import { ChatCompletionContentPartImage } from 'openai/resources/index'

export class CaptureScreens extends Tool {
  name = 'capture_screens'
  description = 'Capture the screens of the board'

  parametersSchema () {
    return {
      type: 'object',
      properties: {}
    }
  }

  async run (_args: Record<string, any>, context: AgentContext): Promise<RunToolResult> {
    const screens = await this.pool
      .SELECT<Pick<ComponentDatabase, 'id'>>`id`
      .FROM`component`
      .WHERE`component.board_id = ${context.board.id}`
      .AND`type = 'mobileScreen'`
      .list()

    if (screens.length === 0) {
      return {
        content: 'No screens found for board'
      }
    }

    const imageBuffers: Array<Buffer<ArrayBufferLike>> = []

    const browser = await chromium.launch({
      headless: true,
      args: ['--start-maximized']
    })

    const browserContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    })

    const authData: AuthenticationData = {
      userId: context.user.id
    }

    const signedCookie = 's:' + signature.sign(JSON.stringify(authData), COOKIE_PARSER_SECRET!)

    await browserContext.addCookies([{
      name: AUTHENTICATION_COOKIE_NAME,
      value: signedCookie,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: NODE_ENV === 'production'
    }])

    const page = await browserContext.newPage()
    const url = `${FRONTEND_BASE_URL}/${context.team.slug}/boards/${context.board.id}/review`

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
        clip: { x, y, width, height }
      })

      imageBuffers.push(buffer)
    }

    await browser.close()

    const imageContents = imageBuffers.map<ChatCompletionContentPartImage>(imageBuffer => ({
      type: 'image_url',
      image_url: {
        url: `data:image/png;base64,${imageBuffer.toString('base64')}`
      }
    }))

    return {
      content: `Captured ${screens.length} screens successfully. The images are in the next message.`,
      messages: [{
        role: 'user',
        content: imageContents
      }]
    }
  }
}
