import { NotFoundError } from '../../classes/Error'
import { Page } from 'puppeteer'

async function clickGoogleButton(page: Page): Promise<void> {
  try {
    // Add timeout and increase precision with specific selector
    await page.waitForSelector('button img[src*="google"]', {
      visible: true
    })
    await page.click('button img[src*="google"]')
  } catch (error) {
    throw new NotFoundError('Google button not found or not clickable')
  }
}
export default clickGoogleButton

