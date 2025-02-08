import { NotFoundError } from '../../classes/Error'
import { Page } from 'puppeteer'

async function clickSendButton(page: Page): Promise<void> {
  try {
    const sendButton = await page.waitForSelector(
      "button[aria-label='Send prompt']",
      { visible: true }
    )
    if (!sendButton) throw new Error('Send button not found')
    await sendButton.click()
  } catch (error) {
    throw new NotFoundError('ChatGPT Send button not found')
  }
}

export default clickSendButton

