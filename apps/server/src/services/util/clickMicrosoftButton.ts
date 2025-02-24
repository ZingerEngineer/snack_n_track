import { NotFoundError } from '../../classes/Error'
import { Page } from 'puppeteer'

async function clickMicrosoftButton(page: Page): Promise<void> {
  try {
    console.log(
      'Waiting for Microsoft button to become visible using selector: button img[src*="microsoft"]'
    )
    await page.waitForSelector('button img[src*="microsoft"]', {
      visible: true
    })
    console.log('Microsoft button is visible. Attempting to click it...')
    await page.click('button img[src*="microsoft"]')
    console.log('Microsoft button clicked successfully.')
  } catch (error) {
    console.error('Error while clicking Microsoft button:', error)
    throw new NotFoundError('Microsoft button not found or not clickable')
  }
}

export default clickMicrosoftButton

