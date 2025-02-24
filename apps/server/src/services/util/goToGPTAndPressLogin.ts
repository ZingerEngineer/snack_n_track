import { InternalServerError } from '../../classes/Error'
import { Page } from 'puppeteer'

async function goToGPTAndPressLogin(page: Page): Promise<void> {
  try {
    console.log(
      '[goToGPTAndPressLogin] Navigating to ChatGPT login page: https://chat.openai.com'
    )
    await page.goto('https://chat.openai.com')
    console.log(
      '[goToGPTAndPressLogin] Navigation initiated. Waiting for page load (networkidle0)...'
    )
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    console.log('[goToGPTAndPressLogin] Page loaded successfully.')

    // Wait for the login button using two possible selectors.
    console.log(
      '[goToGPTAndPressLogin] Waiting for login button using Promise.race with two selectors.'
    )
    const buttonElement = await Promise.race([
      page.waitForSelector('button.btn-primary[data-testid="login-button"]', {
        visible: true
      }),
      page.waitForSelector(
        'button[class="btn relative btn-primary btn-small"]',
        { visible: true }
      )
    ])
    console.log('[goToGPTAndPressLogin] Login button found.')
    if (buttonElement) {
      const buttonHTML = await buttonElement.evaluate((el) => el.outerHTML)
      console.log('[goToGPTAndPressLogin] Login button HTML:', buttonHTML)
    } else {
      console.warn(
        '[goToGPTAndPressLogin] No login button element returned from Promise.race.'
      )
    }

    // Click on the login button using Promise.race.
    console.log(
      '[goToGPTAndPressLogin] Attempting to click on login button using Promise.race for two selectors.'
    )
    await Promise.race([
      page.click('button.btn-primary[data-testid="login-button"]'),
      page.click('button[class="btn relative btn-primary btn-small"]')
    ])
    console.log(
      '[goToGPTAndPressLogin] Click action performed on login button.'
    )
  } catch (error) {
    console.error('[goToGPTAndPressLogin] Error encountered:', error)
    throw new InternalServerError(
      'Error while navigating to ChatGPT login page'
    )
  }
}

export default goToGPTAndPressLogin

