import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import loginToMicrosoft from './util/loginToMicrosoft'
import typeGPTMainPrompt from './util/typeGPTMainPrompt'
import { checkCredentials } from './util/checkCredentials'
import goToGPTAndPressLogin from './util/goToGPTAndPressLogin'
import clickMicrosoftButton from './util/clickMicrosoftButton'
import uploadImageToGPT from './util/uploadImageToGPT'
import debouncedCheckingUpload from './util/keepCheckingUploadCircles'
import clickSendButton from './util/clickSendButton'
import getJSONResponse from './util/getJSONResponse'
import { Calculator } from './types'
import { InternalServerError, NotFoundError } from '../classes/Error'
import {
  INutritionData,
  IEstimatedNutritionData,
  IFailureObject
} from '../types/global.types'

import {
  NutritionDataSchema,
  EstimatedNutritionDataSchema
} from '../schemas/calculator.zod'

puppeteer.use(StealthPlugin())

async function scrappingCalculator(
  imageURL: string,
  attempts: number = 0,
  maxRetries: number = 3
): Promise<INutritionData | IEstimatedNutritionData | IFailureObject> {
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

  let response: INutritionData | IEstimatedNutritionData | IFailureObject = {
    status: 'failed'
  }

  const mainPrompt =
    'I will provide an image of Egyptian food. Please tell me what is inisde the image and approximate nutritional data about the image and respond with a certainty level based on the clarity and coherence of the food representation. Your response should be formatted as JSON. 1. If the image is clear and coherently represents the food parts, provide a certainty percentage between 90-100%. Include the following fields in your JSON response: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (true). - `name`: the specific name of the food. - `type_of_food`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. - `proteins`: the amount of protein in appropriate measurement units (ml or grams). - `carbs`: the amount of carbohydrates in appropriate measurement units (ml or grams). - `fats`: the amount of fats in appropriate measurement units (ml or grams). - `vitamins`: an array of objects, each containing: - `vitamin_name`: the name of the vitamin. - `vitamin_portion`: the amount in appropriate measurement units (ml or grams). 2. If the image is somewhat blurry or the food is not coherent enough, provide a certainty percentage between 60-80%. Your JSON response should include: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (false). - `estimated_name`: your best estimate of the food name. - `estimated_typeOfFood`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. Please analyze the image and provide your response accordingly. Take your time and reply only with the JSON file.'

  while (attempts < maxRetries) {
    try {
      const page = await browser.newPage()

      await goToGPTAndPressLogin(page)

      await clickMicrosoftButton(page)

      await loginToMicrosoft(email, password, page)

      await typeGPTMainPrompt(page, mainPrompt)

      await uploadImageToGPT(page, imageURL)

      await debouncedCheckingUpload(page)

      await clickSendButton(page)

      await page.waitForSelector('div[data-message-author-role="assistant"]', {
        visible: true
      })

      const jsonObject = await getJSONResponse(page)

      if (!jsonObject) {
        throw new InternalServerError('Error in getJSONResponse')
      }

      try {
        response = NutritionDataSchema.parse(jsonObject)
      } catch (error) {
        try {
          response = EstimatedNutritionDataSchema.parse(jsonObject)
        } catch (error) {
          throw new InternalServerError('Error in parsing JSON')
        }
      }
      await browser.close()
      return response
    } catch (error) {
      await browser.close()
      console.error(`Attempt ${attempts + 1}`)
      console.log(error)
      attempts++
      return await scrappingCalculator(imageURL, attempts, maxRetries)
    }
  }
  return response
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
}

