import { NotFoundError } from '../../classes/Error'
import { Page } from 'puppeteer'

async function clickSendButton(page: Page): Promise<void> {
  try {
    console.log('Waiting for the send button to become visible...')
    const sendButton = await page.waitForSelector(
      "button[aria-label='Send prompt']",
      { visible: true }
    )
    if (!sendButton) {
      console.error('Send button was not found after waiting for the selector.')
      throw new Error('Send button not found')
    }
    console.log('Send button found. Attempting to click it...')
    await sendButton.click()
    console.log('Send button clicked successfully.')
  } catch (error) {
    console.error('Error in clickSendButton:', error)
    throw new NotFoundError('ChatGPT Send button not found')
  }
}
export default clickSendButton

