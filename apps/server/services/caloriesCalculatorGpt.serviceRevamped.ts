import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import loginToMicrosoft from './util/loginToMicrosoft'
// import typeGPTMainPrompt from './util/typeGPTMainPrompt'
import { checkCredentials } from './util/checkCredentials'
import goToGPTAndPressLogin from './util/goToGPTAndPressLogin'
import clickMicrosoftButton from './util/clickMicrosoftButton'
// import uploadImageToGPT from './util/uploadImageToGPT'
// import debouncedCheckingUpload from './util/debouncedCheckingUpload'
// import clickSendButton from './util/clickSendButton'
// import getJSONResponse from './util/getJSONResponse'
import { Calculator } from './types'
import { InternalServerError, NotFoundError } from '../classes/Error'
import { INutritionData, IEstimatedNutritionData } from '../types/global.types'
import attemptGPTInteraction from './util/attemptGPTInteraction'
// import {
//   NutritionDataSchema,
//   EstimatedNutritionDataSchema
// } from '../schemas/calculator.zod'

puppeteer.use(StealthPlugin())

// async function scrappingCalculator(
//   imageURL: string,
//   attempts: number = 0,
//   maxRetries: number = 3
// ): Promise<INutritionData | IEstimatedNutritionData | null> {
//   if (!imageURL) throw new NotFoundError('No image path found')
//   if (attempts >= maxRetries)
//     throw new InternalServerError('Max retries reached')

//   let email = process.env.EMAIL_SECRET
//   let password = process.env.PASSWORD_SECRET

//   const credentialsCheck = checkCredentials(email, password)

//   if (!credentialsCheck) {
//     throw new InternalServerError('Invalid credentials')
//   }
//   email = email as string
//   password = password as string

//   const browser = await puppeteer.launch({ headless: false })

//   let response: INutritionData | IEstimatedNutritionData | null = null

//   const mainPrompt =
//     'I will provide an image of Egyptian food. Please tell me what is inisde the image and approximate nutritional data about the image and respond with a certainty level based on the clarity and coherence of the food representation. Your response should be formatted as JSON. 1. If the image is clear and coherently represents the food parts, provide a certainty percentage between 90-100%. Include the following fields in your JSON response: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (true). - `name`: the specific name of the food. - `type_of_food`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. - `proteins`: the amount of protein in appropriate measurement units (ml or grams). - `carbs`: the amount of carbohydrates in appropriate measurement units (ml or grams). - `fats`: the amount of fats in appropriate measurement units (ml or grams). - `vitamins`: an array of objects, each containing: - `vitamin_name`: the name of the vitamin. - `vitamin_portion`: the amount in appropriate measurement units (ml or grams). 2. If the image is somewhat blurry or the food is not coherent enough, provide a certainty percentage between 60-80%. Your JSON response should include: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (false). - `estimated_name`: your best estimate of the food name. - `estimated_typeOfFood`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. Please analyze the image and provide your response accordingly. Take your time and reply only with the JSON file.'

//   while (attempts < maxRetries) {
//     try {
//       const page = await browser.newPage()

//       await goToGPTAndPressLogin(page)

//       await clickMicrosoftButton(page)

//       await loginToMicrosoft(email, password, page)

//       await typeGPTMainPrompt(page, mainPrompt)

//       await uploadImageToGPT(page, imageURL)

//       await debouncedCheckingUpload(page)

//       await clickSendButton(page)

//       await page.waitForSelector('div[data-message-author-role="assistant"]', {
//         visible: true
//       })

//       const jsonObject = await getJSONResponse(page)

//       if (!jsonObject) {
//         throw new InternalServerError('Error in getJSONResponse')
//       }

//       const parsedNutritionData = NutritionDataSchema.safeParse(jsonObject)
//       if (parsedNutritionData.success) {
//         response = parsedNutritionData.data
//       } else {
//         const parsedEstimatedNutritionData =
//           EstimatedNutritionDataSchema.safeParse(jsonObject)
//         if (parsedEstimatedNutritionData.success) {
//           response = parsedEstimatedNutritionData.data
//         } else {
//           response = null
//         }
//       }

//       if (response) {
//         await browser.close()
//         return response
//       } else {
//         attempts++
//         console.log(`Retrying with attempt ${attempts + 1}`)
//         await page.close()
//       }
//     } catch (error) {
//       await browser.close()
//       console.error(`Attempt ${attempts + 1}`)
//       console.log(error)
//       attempts++
//       return await scrappingCalculator(imageURL, attempts, maxRetries)
//     }
//   }
//   return response
// }

async function scrappingCalculator(
  imageURL: string,
  attempts: number = 0,
  maxRetries: number = 3
): Promise<INutritionData | IEstimatedNutritionData | null> {
  if (!imageURL) throw new NotFoundError('No image path found')
  if (attempts >= maxRetries)
    throw new InternalServerError('Max retries reached')

  let email = process.env.EMAIL_SECRET
  let password = process.env.PASSWORD_SECRET

  const credentialsCheck = checkCredentials(email, password)
  if (!credentialsCheck) {
    throw new InternalServerError('Invalid credentials')
  }
  email = email as string
  password = password as string

  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  try {
    await goToGPTAndPressLogin(page)
    await clickMicrosoftButton(page)
    await loginToMicrosoft(email, password, page)

    // Initial attempt with main prompt
    const mainPrompt =
      'I will provide an image of Egyptian food. Please tell me what is inisde the image and approximate nutritional data about the image and respond with a certainty level based on the clarity and coherence of the food representation. Your response should be formatted as JSON. 1. If the image is clear and coherently represents the food parts, provide a certainty percentage between 90-100%. Include the following fields in your JSON response: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (true). - `name`: the specific name of the food. - `type_of_food`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. - `proteins`: the amount of protein in appropriate measurement units (ml or grams). - `carbs`: the amount of carbohydrates in appropriate measurement units (ml or grams). - `fats`: the amount of fats in appropriate measurement units (ml or grams). - `vitamins`: an array of objects, each containing: - `vitamin_name`: the name of the vitamin. - `vitamin_portion`: the amount in appropriate measurement units (ml or grams). 2. If the image is somewhat blurry or the food is not coherent enough, provide a certainty percentage between 60-80%. Your JSON response should include: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (false). - `estimated_name`: your best estimate of the food name. - `estimated_typeOfFood`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. Please analyze the image and provide your response accordingly. Take your time and reply only with the JSON file.'
    let response = await attemptGPTInteraction(page, {
      prompt: mainPrompt,
      imageURL,
      isFirstAttempt: true
    })

    // If parsing fails, try with reminder prompt
    if (!response) {
      const reminderPrompt =
        'Using the image I already provided, please format your response as a valid JSON following the exact same structure I mentioned before. Make sure to include all required fields and use the correct data types.'

      let parseRetries = 0
      const maxParseRetries = 2

      while (!response && parseRetries < maxParseRetries) {
        response = await attemptGPTInteraction(page, {
          prompt: reminderPrompt,
          imageURL: null, // Don't upload image again
          isFirstAttempt: false
        })
        parseRetries++
      }
    }

    await browser.close()

    if (!response && attempts < maxRetries - 1) {
      // If still no valid response, try the whole process again
      return await scrappingCalculator(imageURL, attempts + 1, maxRetries)
    }

    return response
  } catch (error) {
    await browser.close()
    console.error(`Attempt ${attempts + 1} failed:`, error)

    if (attempts < maxRetries - 1) {
      return await scrappingCalculator(imageURL, attempts + 1, maxRetries)
    }
    return null
  }
}

export class CaloriesCalculatorGPTRevamped implements Calculator {
  private maxRetries: number

  constructor(maxRetries: number = 3) {
    this.maxRetries = maxRetries
  }

  public readonly calculateCalories = async (imageURL: string) => {
    const puppeteerResponse = await scrappingCalculator(imageURL, 0, 2)
    return puppeteerResponse
  }

  public readonly recursiveCalculateCalories = async (
    imageURL: string,
    attempts = 0,
    maxAttempts = 3
  ) => {
    const puppeteerResponse = await scrappingCalculator(
      imageURL,
      attempts,
      maxAttempts
    )
    return {
      status: puppeteerResponse ? ('success' as const) : ('failed' as const),
      calculatorResponse: puppeteerResponse,
      attempts
    }
  }
}

