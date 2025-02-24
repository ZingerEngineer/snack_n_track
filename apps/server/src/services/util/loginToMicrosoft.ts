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

    console.log('[loginToMicrosoft] Starting Microsoft login process.')
    console.log(
      '[loginToMicrosoft] Waiting for email input field to be visible...'
    )
    await page.waitForSelector(selectors.emailInput, { visible: true })
    console.log('[loginToMicrosoft] Email input field is visible.')

    console.log('[loginToMicrosoft] Typing email address.')
    await page.type(selectors.emailInput, email, { delay: 50 })

    console.log('[loginToMicrosoft] Pressing Enter after email input.')
    await page.keyboard.press('Enter')

    console.log(
      '[loginToMicrosoft] Waiting for password input field to be visible...'
    )
    await page.waitForSelector(selectors.passwordInput, { visible: true })
    console.log('[loginToMicrosoft] Password input field is visible.')

    console.log('[loginToMicrosoft] Typing password.')
    await page.type(selectors.passwordInput, password, { delay: 50 })

    console.log('[loginToMicrosoft] Pressing Enter after password input.')
    await page.keyboard.press('Enter')

    console.log(
      '[loginToMicrosoft] Waiting for navigation to complete (networkidle0)...'
    )
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    console.log('[loginToMicrosoft] Navigation complete.')

    console.log(
      '[loginToMicrosoft] Waiting for the decline button to be visible...'
    )
    await page.waitForSelector(selectors.declineButton, { visible: true })
    console.log('[loginToMicrosoft] Decline button is visible.')

    const declineButton = await page.$(selectors.declineButton)
    if (declineButton) {
      console.log('[loginToMicrosoft] Clicking the decline button.')
      await declineButton.click()
    } else {
      console.warn('[loginToMicrosoft] Decline button not found after waiting.')
    }

    console.log(
      '[loginToMicrosoft] Microsoft login process completed successfully.'
    )
  } catch (error) {
    console.error('[loginToMicrosoft] Error during Microsoft login:', error)
    throw new ValidationError('Microsoft login failed')
  }
}

export default loginToMicrosoft

