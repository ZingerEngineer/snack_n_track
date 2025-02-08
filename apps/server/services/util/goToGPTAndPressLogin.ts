import { InternalServerError } from '../../classes/Error'
import { Page } from 'puppeteer'

async function goToGPTAndPressLogin(page: Page): Promise<void> {
  try {
    // Navigate to ChatGPT login page
    await page.goto('https://chat.openai.com')
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    // Login handling
    await page.waitForSelector(
      'button.btn-primary[data-testid="login-button"]',
      {
        visible: true
      }
    )
    await page.click('button.btn-primary[data-testid="login-button"]')
  } catch (error) {
    throw new InternalServerError(
      'Error while navigating to ChatGPT login page'
    )
  }
}

export default goToGPTAndPressLogin

