import { NotFoundError } from '../../classes/Error'
import { Page } from 'puppeteer'

// async function clickSendButton(page: Page): Promise<void> {
//   try {
//     const sendButton = await page.waitForSelector(
//       "button[aria-label='Send prompt']",
//       { visible: true }
//     )
//     if (!sendButton) throw new Error('Send button not found')
//     await sendButton.click()
//   } catch (error) {
//     throw new NotFoundError('ChatGPT Send button not found')
//   }
// }

async function clickSendButton(page: Page): Promise<void> {
  try {
    await Promise.race([
      page.waitForSelector("button[aria-label='Send prompt']", {
        visible: true,
        timeout: 10000
      }),
      page.waitForSelector("button[data-testid='send-button']", {
        visible: true,
        timeout: 10000
      })
    ])
    await page.click(
      "button[aria-label='Send prompt'], button[data-testid='send-button']"
    )
  } catch (error) {
    throw new NotFoundError('Send button not found after 5 seconds')
  }
}

export default clickSendButton

