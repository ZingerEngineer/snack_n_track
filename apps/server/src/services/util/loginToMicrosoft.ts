import { ValidationError } from '../../classes/Error'
import { Page } from 'puppeteer'

const loginToMicrosoft = async (
  email: string,
  password: string,
  page: Page
) => {
  try {
    const selectors = {
      emailInput: 'input[type="email"]',
      passwordInput: 'input[type="password"]',
      declineButton: 'button[id="declineButton"]'
    }

    // Wait for and fill email
    await page.waitForSelector(selectors.emailInput, {
      visible: true
    })
    await page.type(selectors.emailInput, email, { delay: 50 })
    await page.keyboard.press('Enter')

    // Wait for and fill password
    await page.waitForSelector(selectors.passwordInput, {
      visible: true
    })
    await page.type(selectors.passwordInput, password, { delay: 50 })
    await page.keyboard.press('Enter')

    // Wait for navigation and decline button

    await page.waitForNavigation({
      waitUntil: 'networkidle0'
    })

    await page.waitForSelector(selectors.declineButton, {
      visible: true
    })

    const declineButton = await page.$(selectors.declineButton)
    if (declineButton) {
      await declineButton.click()
    }
  } catch (error) {
    throw new ValidationError('Microsoft login failed')
  }
}

export default loginToMicrosoft

