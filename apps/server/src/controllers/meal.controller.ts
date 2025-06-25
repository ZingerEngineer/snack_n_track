import { Request } from 'express'
import { NotFoundError } from '../classes/Error'
import fs from 'fs/promises'
import { initSupaBaseClient } from '../services/supabase'
import { SupabaseFileUploader } from './classes/SupaBaseFileUploader'
import { InternalServerError } from '../classes/Error'
import downloadFile from '../utils/downloadFile'
import { CaloriesCalculatorGPTRevamped } from '../services/caloriesCalculatorGpt.serviceRevamped'
import { geminiApi } from '../services/geminiImageAnalysis.service'
import { checkFileExists } from './utils/checkFileExists'
import { extractJsonFromString } from '../utils/extractJsonFromString'

export const scanMealControllerGemini = async (req: Request) => {
  try {
    console.info('[scanMealController] Request received')
    const file = req.file
    const checkedFile = checkFileExists(file)

    console.debug('[scanMealController] File details:', {
      originalname: checkedFile.originalname,
      filename: checkedFile.filename,
      path: checkedFile.path,
      mimetype: checkedFile.mimetype
    })

    // Initialize Supabase client and upload file
    const supaBaseClient = initSupaBaseClient()
    const supaBaseFileUploader = new SupabaseFileUploader(
      checkedFile,
      supaBaseClient
    )
    const { id, path, fullPath } = await supaBaseFileUploader.upload()
    console.info('[scanMealController] File uploaded to Supabase:', {
      id,
      path,
      fullPath
    })
    const fileNameWithExtension = fullPath.split('/').pop()
    if (!fileNameWithExtension) {
      console.error(
        '[scanMealController] File name with extension is undefined'
      )
      throw new NotFoundError('File not found after upload')
    }

    const { data: publicURL } = supaBaseClient.storage
      .from('snack-n-track-bucket')
      .getPublicUrl(`meal/${fileNameWithExtension}`)

    if (!publicURL) {
      console.error('[scanMealController] Failed to retrieve public URL')
      throw new InternalServerError('Failed to retrieve public URL')
    }

    console.info(
      '[scanMealController] Public URL retrieved:',
      publicURL.publicUrl
    )

    // Delete local file after successful upload
    await fs.unlink(checkedFile.path)
    console.info('[scanMealController] Local file deleted successfully')

    // Download file from public URL
    const finalFilePath = await downloadFile(
      publicURL.publicUrl,
      './downloads',
      fileNameWithExtension
    )
    console.info('[scanMealController] File downloaded to:', finalFilePath)

    if (!finalFilePath) {
      console.error('[scanMealController] Final file path is undefined')
      throw new NotFoundError('File not found after download')
    }

    // Call Gemini API for analysis
    const response = await geminiApi(
      finalFilePath,
      'Provided the image of an Egyptian food. Please tell me what is inisde the image and approximate nutritional data about the image and respond with a certainty level based on the clarity and coherence of the food representation. Your response should be formatted as JSON. 1. If the image is clear and coherently represents the food parts, provide a certainty percentage between 90-100%. Include the following fields in your JSON response: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (true). - `name`: the specific name of the food. - `keywords`: multiple keywords or names for the analyzed food in Arabic and English in slang, formal and multiple accents.  - `type_of_food`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. - `proteins`: the amount of protein in appropriate measurement units (ml or grams). - `carbs`: the amount of carbohydrates in appropriate measurement units (ml or grams). - `fats`: the amount of fats in appropriate measurement units (ml or grams). - `vitamins`: an array of objects, each containing: - `vitamin_name`: the name of the vitamin. - `vitamin_portion`: the amount in appropriate measurement units (ml or grams). 2. If the image is somewhat blurry or the food is not coherent enough, provide a certainty percentage between 60-90%. Your JSON response should include: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (false). - `estimated_name`: your best estimate of the food name. - `estimated_typeOfFood`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. Please analyze the image and provide your response accordingly. Take your time and reply only with the JSON file.'
    )

    if (!response || !response.text) {
      console.error('[scanMealController] No response from Gemini API')
      throw new InternalServerError('Failed to get response from Gemini API')
    }

    console.info(
      '[scanMealController] Gemini API response received:',
      response.data
    )

    // Extract JSON from Gemini API response
    const jsonResponse = extractJsonFromString(response.text)
    if (!jsonResponse) {
      console.error(
        '[scanMealController] Failed to extract JSON from Gemini API response'
      )
      throw new InternalServerError(
        'Failed to extract JSON from Gemini API response'
      )
    }

    console.debug('[scanMealController] Extracted JSON response:', jsonResponse)
    return jsonResponse
  } catch (error) {
    console.error('[scanMealController] Error occurred:', error)
    throw new InternalServerError(
      'An error occurred while processing the request'
    )
  }
}

export const scanMealControllerGPT = async (req: Request) => {
  try {
    console.info('[scanMealController] Request received')
    const file = req.file
    const checkedFile = checkFileExists(file)
    const GPTCalculator = new CaloriesCalculatorGPTRevamped()
    const supabaseClient = initSupaBaseClient()
    const supabaseFileUploader = new SupabaseFileUploader(
      checkedFile,
      supabaseClient
    )
    const { id, path, fullPath } = await supabaseFileUploader.upload()
    console.info('[scanMealController] File uploaded to Supabase:', {
      id,
      path,
      fullPath
    })
    const { data: publicURL } = supabaseClient.storage
      .from('snack-n-track-bucket')
      .getPublicUrl(`meal/${checkedFile.filename}`)
    if (!publicURL) {
      console.error('[scanMealController] Failed to retrieve public URL')
      throw new InternalServerError('Failed to retrieve public URL')
    }
    console.info(
      '[scanMealController] Public URL retrieved:',
      publicURL.publicUrl
    )
    // Delete local file after successful upload
    await fs.unlink(checkedFile.path)
    console.info('[scanMealController] Local file deleted successfully')
    // Download file from public URL
    const finalFilePath = await downloadFile(
      publicURL.publicUrl,
      './downloads',
      checkedFile.filename
    )
    console.info('[scanMealController] File downloaded to:', finalFilePath)
    if (!finalFilePath) {
      console.error('[scanMealController] Final file path is undefined')
      throw new NotFoundError('File not found after download')
    }
    const response = await GPTCalculator.calculateCalories(finalFilePath)
    if (!response) {
      console.error('[scanMealController] No response from GPT API')
      throw new InternalServerError('Failed to get response from GPT API')
    }
    console.info('[scanMealController] GPT API response received:', response)
    return response
  } catch (error) {
    console.error('[scanMealController] Error occurred:', error)
    throw new InternalServerError(
      'An error occurred while processing the request'
    )
  }
}

