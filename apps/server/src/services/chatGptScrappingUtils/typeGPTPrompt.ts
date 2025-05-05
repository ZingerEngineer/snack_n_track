import { Page } from 'puppeteer'

async function typeGPTPrompt(page: Page, prompt: string) {
  console.log('[typeGPTPrompt] Waiting for textarea to be visible...')
  await page.waitForSelector('textarea', { visible: true })
  console.log('[typeGPTPrompt] Textarea is visible. Typing prompt...')
  await page.type('textarea', prompt)
  console.log('[typeGPTPrompt] Prompt typed successfully.')
}

export default typeGPTPrompt

