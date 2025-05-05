import { Request, Response } from 'express'
import { NotFoundError, ValidationError } from '../classes/Error'
import fs from 'fs/promises'
import initSupaBaseClient from '../services/supabase'
import { InternalServerError } from '../classes/Error'
import downloadFile from '../utils/downloadFile'
import { CaloriesCalculatorGPTRevamped } from '../services/caloriesCalculatorGpt.serviceRevamped'
import {
  appendExtensionBasedOnMimeType,
  generateFileName
} from '../utils/file/file.utils'
import { geminiApi } from '../services/geminiImageAnalysis.service'

const scanMealController = async (req: Request) => {
  try {
    console.log('[scanMealController] Request received')
    const file = req.file
    if (!file) {
      console.error('[scanMealController] No file found in request')
      throw new ValidationError(
        'Scan meal controller failed due to missing file'
      )
    }
    console.log('[scanMealController] File received:', {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype
    })

    // Read file buffer
    console.log(
      '[scanMealController] Reading file from local storage:',
      file.path
    )
    const fileBuffer = await fs.readFile(file.path)
    console.log(
      '[scanMealController] File read successfully, buffer size:',
      fileBuffer.length
    )

    const supaBaseClient = initSupaBaseClient()
    console.log('[scanMealController] Supabase client initialized')

    const fileName = generateFileName(file.filename)
    console.log('[scanMealController] Generated file name:', fileName)

    const fileNameWithExtension = appendExtensionBasedOnMimeType(
      fileName,
      file.mimetype
    )
    console.log(
      '[scanMealController] File name with extension:',
      fileNameWithExtension
    )

    console.log('[scanMealController] Uploading file to Supabase storage')
    const { error } = await supaBaseClient.storage
      .from('snack-n-track-bucket')
      .upload(`meal/${fileNameWithExtension}`, fileBuffer, {
        contentType: file.mimetype
      })

    // Handle Supabase upload errors
    if (error) {
      console.error('[scanMealController] Supabase upload error:', error)
      throw new InternalServerError(`Supabase upload failed: ${error.message}`)
    }
    console.log('[scanMealController] File uploaded to Supabase successfully')

    const { data: publicURL } = supaBaseClient.storage
      .from('snack-n-track-bucket')
      .getPublicUrl(`meal/${fileNameWithExtension}`)

    if (!publicURL) {
      console.error('[scanMealController] Public URL retrieval failed')
      throw new InternalServerError('Failed to get public URL')
    }
    console.log(
      '[scanMealController] Retrieved public URL:',
      publicURL.publicUrl
    )

    // Delete the file from the local storage after successful upload
    console.log('[scanMealController] Deleting local file:', file.path)
    await fs.unlink(file.path)
    console.log('[scanMealController] Local file deleted successfully')

    console.log('[scanMealController] Downloading file from public URL')
    const finalFilePath = await downloadFile(
      publicURL.publicUrl,
      `./downloads`,
      fileNameWithExtension
    )
    console.log('[scanMealController] File downloaded to ../downloads')

    if (!finalFilePath) {
      console.error('[scanMealController] Final file path is undefined')
      throw new NotFoundError('File not found')
    }
    const response = await geminiApi(
      finalFilePath,
      'Provided the image of an Egyptian food. Please tell me what is inisde the image and approximate nutritional data about the image and respond with a certainty level based on the clarity and coherence of the food representation. Your response should be formatted as JSON. 1. If the image is clear and coherently represents the food parts, provide a certainty percentage between 90-100%. Include the following fields in your JSON response: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (true). - `name`: the specific name of the food. - `keywords`: multiple keywords or names for the analyzed food in Arabic and English in slang, formal and multiple accents.  - `type_of_food`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. - `proteins`: the amount of protein in appropriate measurement units (ml or grams). - `carbs`: the amount of carbohydrates in appropriate measurement units (ml or grams). - `fats`: the amount of fats in appropriate measurement units (ml or grams). - `vitamins`: an array of objects, each containing: - `vitamin_name`: the name of the vitamin. - `vitamin_portion`: the amount in appropriate measurement units (ml or grams). 2. If the image is somewhat blurry or the food is not coherent enough, provide a certainty percentage between 60-90%. Your JSON response should include: - `percentage_of_certainty`: a number representing the certainty percentage. - `isSure`: a boolean indicating certainty (false). - `estimated_name`: your best estimate of the food name. - `estimated_typeOfFood`: categorize it as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal. Please analyze the image and provide your response accordingly. Take your time and reply only with the JSON file.'
    )
    return {
      status: 'success',
      data: response
    }

    // const GeminiCalculator = new CaloriesCalculatorGemini()
    // console.log(
    //   '[scanMealController] Initiating Gemini calculator with file:',
    //   finalFilePath
    // )
    // if (!finalFilePath) throw new NotFoundError('File not found')
    // const responseGemini = await GeminiCalculator.recursiveCalculateCalories(
    //   finalFilePath,
    //   0,
    //   3
    // )
    // console.log(
    //   '[scanMealController] Gemini calculator response:',
    //   responseGemini
    // )
    // if (!responseGemini) {
    //   console.error('[scanMealController] No response from Gemini calculator')
    //   throw new InternalServerError(
    //     'Failed to get response from Gemini calculator'
    //   )
    // }
    // return responseGemini

    // const GPTCalculator = new CaloriesCalculatorGPTRevamped()
    // console.log(
    //   '[scanMealController] Initiating GPT calculator with file:',
    //   finalFilePath
    // )
    // if (!finalFilePath) throw new NotFoundError('File not found')
    // const response = await GPTCalculator.recursiveCalculateCalories(
    //   finalFilePath,
    //   0,
    //   3
    // )
    // console.log('[scanMealController] GPT calculator response:', response)
    // if (!response) {
    //   console.error('[scanMealController] No response from GPT calculator')
    //   throw new InternalServerError(
    //     'Failed to get response from GPT calculator'
    //   )
    // }
  } catch (error: any) {
    console.error('Scan meal controller failed:', error)
  }
}

export default scanMealController
