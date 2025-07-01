import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import loginToMicrosoft from './chatGptScrappingUtils/loginToMicrosoft'
import { checkCredentials } from './chatGptScrappingUtils/checkCredentials'
import goToGPTAndPressLogin from './chatGptScrappingUtils/goToGPTAndPressLogin'
import clickMicrosoftButton from './chatGptScrappingUtils/clickMicrosoftButton'
import { Calculator } from './types'
import { InternalServerError, NotFoundError } from '../classes/Error'
import { INutritionData, IEstimatedNutritionData } from '../types/global.types'
import attemptGPTInteraction from './chatGptScrappingUtils/attemptGPTInteraction'
import { Browser } from 'puppeteer'
import puppeteerExtra from 'puppeteer-extra'
puppeteerExtra.use(StealthPlugin())

// Helper delay function
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function scrappingCalculator(
  imageURL: string,
  attempts: number = 0,
  maxRetries: number = 3
): Promise<INutritionData | IEstimatedNutritionData | null> {
  console.log(
    `[scrappingCalculator] Called with imageURL: ${imageURL}, attempt: ${attempts + 1}`
  )

  if (!imageURL) {
    console.error('[scrappingCalculator] No image URL provided')
    throw new NotFoundError('No image path found')
  }
  if (attempts >= maxRetries) {
    console.error('[scrappingCalculator] Maximum retry attempts reached')
    throw new InternalServerError('Max retries reached')
  }

  let browser: Browser | null = null
  let email = process.env.EMAIL_SECRET
  let password = process.env.PASSWORD_SECRET

  console.log('[scrappingCalculator] Checking credentials')
  const credentialsCheck = checkCredentials(email, password)
  if (!credentialsCheck) {
    console.error('[scrappingCalculator] Credentials check failed')
    throw new InternalServerError('Invalid credentials')
  }
  email = email as string
  password = password as string

  try {
    console.log('[scrappingCalculator] Launching browser')
    browser = await puppeteerExtra.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 760, height: 1080 })
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    )
    console.log('[scrappingCalculator] New page created')

    console.log('[scrappingCalculator] Navigating to GPT login page')
    await goToGPTAndPressLogin(page)

    console.log('[scrappingCalculator] Clicking Microsoft login button')
    await clickMicrosoftButton(page)

    console.log(
      '[scrappingCalculator] Logging in with Microsoft using provided credentials'
    )
    await loginToMicrosoft(email, password, page)

    // Define the main prompt
    const mainPrompt =
      'I will provide an image of Egyptian food. Please tell me what is inisde the image and approximate nutritional data about the image and respond with a certainty level based on the clarity and coherence of the food representation. Your response should be formatted as JSON. 1. If the image is clear and coherently represents the food parts, provide a certainty percentage between 90-100%. Include the following fields in your JSON response: - `certainty_percentage`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (true). - `name`: the specific name of the food. - `type_of_food`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. - `proteins`: the amount of protein in appropriate measurement units (ml or grams). - `carbs`: the amount of carbohydrates in appropriate measurement units (ml or grams). - `fats`: the amount of fats in appropriate measurement units (ml or grams). - `vitamins`: an array of objects, each containing: - `vitamin_name`: the name of the vitamin. - `vitamin_portion`: the amount in appropriate measurement units (ml or grams). 2. If the image is somewhat blurry or the food is not coherent enough, provide a certainty percentage between 60-80%. Your JSON response should include: - `certainty_percentage`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (false). - `estimated_name`: your best estimate of the food name. - `estimated_typeOfFood`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. Please analyze the image and provide your response accordingly. Take your time and reply only with the JSON file.'
    console.log('[scrappingCalculator] Sending main prompt to GPT')
    let response = await attemptGPTInteraction(page, {
      prompt: mainPrompt,
      imageURL,
      isFirstAttempt: true
    })
    console.log('[scrappingCalculator] Response from main prompt:', response)

    // If parsing fails, try with a reminder prompt
    if (!response) {
      console.warn(
        '[scrappingCalculator] Main prompt failed to produce a valid response. Trying reminder prompt.'
      )
      const reminderPrompt =
        'Using the image I already provided, please format your response as a valid JSON following the exact same structure I mentioned before. Make sure to include all required fields and use the correct data types.'
      let parseRetries = 0
      const maxParseRetries = 2

      while (!response && parseRetries < maxParseRetries) {
        console.log(
          `[scrappingCalculator] Reminder prompt attempt ${parseRetries + 1}`
        )
        response = await attemptGPTInteraction(page, {
          prompt: reminderPrompt,
          imageURL: null, // Don't upload image again
          isFirstAttempt: false
        })
        console.log(
          `[scrappingCalculator] Response from reminder prompt attempt ${parseRetries + 1}:`,
          response
        )
        parseRetries++
      }
    }

    console.log(
      '[scrappingCalculator] Closing browser after successful interaction'
    )
    await browser.close()

    if (!response && attempts < maxRetries - 1) {
      console.warn(
        '[scrappingCalculator] No valid response received. Retrying full process after delay.'
      )
      await delay(3000)
      return await scrappingCalculator(imageURL, attempts + 1, maxRetries)
    }

    console.log('[scrappingCalculator] Final response obtained:', response)
    return response
  } catch (error) {
    console.error(
      `[scrappingCalculator] Attempt ${attempts + 1} failed:`,
      error
    )
    if (browser) {
      console.log('[scrappingCalculator] Closing browser due to error.')
      await browser.close()
    }
    if (attempts < maxRetries - 1) {
      console.warn(
        '[scrappingCalculator] Retrying process due to error after delay.'
      )
      await delay(3000)
      return await scrappingCalculator(imageURL, attempts + 1, maxRetries)
    }
    throw new InternalServerError(
      `Scrapping process failed after ${attempts + 1} attempts.`
    )
  }
}

export class CaloriesCalculatorGPTRevamped implements Calculator {
  private maxRetries: number

  constructor(maxRetries: number = 3) {
    this.maxRetries = maxRetries
    console.log(
      '[CaloriesCalculatorGPTRevamped] Initialized with maxRetries:',
      this.maxRetries
    )
  }

  public readonly calculateCalories = async (imageURL: string) => {
    console.log(
      '[CaloriesCalculatorGPTRevamped.calculateCalories] Called with imageURL:',
      imageURL
    )
    const puppeteerResponse = await scrappingCalculator(
      imageURL,
      0,
      this.maxRetries
    )
    console.log(
      '[CaloriesCalculatorGPTRevamped.calculateCalories] Response:',
      puppeteerResponse
    )
    return puppeteerResponse
  }

  public readonly recursiveCalculateCalories = async (
    imageURL: string,
    attempts = 0,
    maxAttempts = 3
  ) => {
    console.log(
      '[CaloriesCalculatorGPTRevamped.recursiveCalculateCalories] Called with imageURL:',
      imageURL,
      'attempts:',
      attempts,
      'maxAttempts:',
      maxAttempts
    )
    const puppeteerResponse = await scrappingCalculator(
      imageURL,
      attempts,
      maxAttempts
    )
    console.log(
      '[CaloriesCalculatorGPTRevamped.recursiveCalculateCalories] Final puppeteerResponse:',
      puppeteerResponse
    )
    return {
      status: puppeteerResponse ? 'success' : 'failed',
      calculatorResponse: puppeteerResponse,
      attempts
    }
  }
}

