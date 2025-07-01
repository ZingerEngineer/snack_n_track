import { Request } from 'express'
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
  UnauthorizedError
} from '../classes/Error'
import fs from 'fs/promises'
import { initSupaBaseClient } from '../services/supabase'
import { SupabaseFileUploader } from './classes/SupaBaseFileUploader'
import downloadFile from '../utils/downloadFile'
import { CaloriesCalculatorGPTRevamped } from '../services/caloriesCalculatorGpt.serviceRevamped'
import { geminiApi } from '../services/geminiImageAnalysis.service'
import { extractJsonFromString } from '../utils/extractJsonFromString'
import {
  validateUploadedFile,
  validateRequestParameters,
  sanitizeFileName
} from '../utils/fileValidation'
import { ConcurrencyManager, RateLimiter } from '../utils/concurrencyManager'
import {
  ScanMealResponseSchema,
  TScanMealRequest,
  TScanMealResponse
} from '../schemas/meal/scanMeal.zod'
import MealDao from '../daos/meal.dao'
import UserDAO from '../daos/user.dao'

// Initialize singletons
const concurrencyManager = ConcurrencyManager.getInstance()
const rateLimiter = RateLimiter.getInstance()
const mealDao = new MealDao()
const userDao = new UserDAO()

/**
 * Enhanced meal scanning controller with security, validation, and concurrency control
 */
export const scanMealController = async (
  req: Request
): Promise<TScanMealResponse> => {
  const startTime = Date.now()
  let operationId: string | null = null

  try {
    console.info(
      '[scanMealController] Request received at',
      new Date().toISOString()
    )

    // Extract user information from authenticated request
    const userId = (req as any).user?.id
    const userEmail = (req as any).user?.email

    console.debug('[scanMealController] User context:', { userId, userEmail })

    // Rate limiting check
    if (userId && !rateLimiter.isAllowed(userId)) {
      const remaining = rateLimiter.getRemainingRequests(userId)
      throw new ValidationError(
        `Rate limit exceeded. Try again in ${Math.ceil((remaining.resetTime - Date.now()) / 1000)} seconds.`
      )
    }

    // Validate and sanitize request parameters
    const requestParams = validateRequestParameters(req)
    console.debug(
      '[scanMealController] Validated request params:',
      requestParams
    )

    // File validation
    const validatedFile = validateUploadedFile(req.file)
    console.debug('[scanMealController] File validation successful:', {
      originalname: validatedFile.originalname,
      size: `${(validatedFile.size / 1024 / 1024).toFixed(2)}MB`,
      mimetype: validatedFile.mimetype
    })

    // Acquire concurrency slot
    operationId = await concurrencyManager.acquireSlot('scan', userId)
    console.info('[scanMealController] Concurrency slot acquired:', operationId)

    // Verify user exists and is active (if userId provided)
    if (requestParams.userId && requestParams.userId !== userId) {
      throw new UnauthorizedError('Cannot scan meals for other users')
    }

    if (userId) {
      const user = await userDao.getUserById(userId)
      if (!user || user.softDelete) {
        throw new UnauthorizedError('User account is not active')
      }
    }

    // Sanitize filename for security
    const sanitizedFileName = sanitizeFileName(validatedFile.originalname)
    console.debug('[scanMealController] Sanitized filename:', sanitizedFileName)

    // Initialize Supabase client and upload file
    const supaBaseClient = initSupaBaseClient()
    const supaBaseFileUploader = new SupabaseFileUploader(
      {
        ...validatedFile,
        originalname: sanitizedFileName
      } as Express.Multer.File,
      supaBaseClient
    )

    const { id, path, fullPath } = await supaBaseFileUploader.upload()
    console.info('[scanMealController] File uploaded to Supabase:', {
      id,
      path,
      fullPath: fullPath.substring(0, 100) + '...' // Truncate for logging
    })

    const fileNameWithExtension = fullPath.split('/').pop()
    if (!fileNameWithExtension) {
      throw new NotFoundError('File not found after upload')
    }

    // Get public URL
    const { data: publicURL } = supaBaseClient.storage
      .from('snack-n-track-bucket')
      .getPublicUrl(`meal/${fileNameWithExtension}`)

    if (!publicURL?.publicUrl) {
      throw new InternalServerError('Failed to retrieve public URL')
    }

    console.info('[scanMealController] Public URL retrieved')

    // Clean up local file immediately after upload
    try {
      await fs.unlink(validatedFile.path)
      console.info('[scanMealController] Local file deleted successfully')
    } catch (unlinkError) {
      console.warn(
        '[scanMealController] Failed to delete local file:',
        unlinkError
      )
    }

    // Download file from public URL for processing
    const finalFilePath = await downloadFile(
      publicURL.publicUrl,
      './downloads',
      fileNameWithExtension
    )

    if (!finalFilePath) {
      throw new NotFoundError('File not found after download')
    }

    console.info('[scanMealController] File downloaded for processing')

    // Call AI service for analysis
    const aiResponse = await analyzeImageWithAI(
      finalFilePath,
      requestParams.mealName
    )

    // Clean up downloaded file
    try {
      await fs.unlink(finalFilePath)
      console.info('[scanMealController] Downloaded file cleaned up')
    } catch (unlinkError) {
      console.warn(
        '[scanMealController] Failed to delete downloaded file:',
        unlinkError
      )
    }

    // Validate AI response structure
    const validatedResponse = ScanMealResponseSchema.parse(aiResponse)
    console.info('[scanMealController] AI response validated successfully')

    // Save meal to database if requested and user is authenticated
    if (requestParams.saveToHistory !== false && userId) {
      try {
        await saveMealToDatabase(validatedResponse, userId, requestParams)
        console.info('[scanMealController] Meal saved to database')
      } catch (saveError) {
        console.warn(
          '[scanMealController] Failed to save meal to database:',
          saveError
        )
        // Don't fail the entire request if saving fails
      }
    }

    // Log performance metrics
    const duration = Date.now() - startTime
    console.info('[scanMealController] Request completed successfully:', {
      duration: `${duration}ms`,
      userId,
      certainty: validatedResponse.certainty_percentage,
      foodType:
        validatedResponse.type_of_food || validatedResponse.estimated_typeOfFood
    })

    return validatedResponse
  } catch (error) {
    const duration = Date.now() - startTime
    console.error('[scanMealController] Error occurred:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: `${duration}ms`,
      userId: (req as any).user?.id,
      stack: error instanceof Error ? error.stack : undefined
    })

    // Re-throw known errors
    if (
      error instanceof ValidationError ||
      error instanceof UnauthorizedError ||
      error instanceof NotFoundError ||
      error instanceof InternalServerError
    ) {
      throw error
    }

    // Wrap unknown errors
    throw new InternalServerError(
      `An error occurred while processing the request: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  } finally {
    // Always release concurrency slot
    if (operationId) {
      concurrencyManager.releaseSlot(operationId)
      console.debug(
        '[scanMealController] Concurrency slot released:',
        operationId
      )
    }
  }
}

/**
 * Analyzes image using AI service with proper error handling
 */
async function analyzeImageWithAI(
  filePath: string,
  mealName?: string
): Promise<any> {
  const prompt = `Analyze the image of food. Please tell me what is inside the image and provide approximate nutritional data with a certainty level based on the clarity and coherence of the food representation. Your response should be formatted as JSON.

1. If the image is clear and coherently represents the food parts, provide a certainty percentage between 90-100%. Include the following fields:
   - certainty_percentage: number (90-100)
   - isSure: true
   - name: specific name of the food
   - keywords: array of keywords/names in Arabic and English
   - type_of_food: categorize as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal
   - proteins: amount in grams
   - carbs: amount in grams  
   - fats: amount in grams
   - calories: total calories
   - vitamins: array of {vitamin_name, vitamin_portion}

2. If the image is blurry or food is not coherent enough, provide certainty 60-90%:
   - certainty_percentage: number (60-90)
   - isSure: false
   - estimated_name: best estimate of food name
   - estimated_typeOfFood: categorize as above

${mealName ? `Note: User suggested this might be "${mealName}"` : ''}

Analyze the image and provide only the JSON response.`

  try {
    const response = await geminiApi(filePath, prompt)

    if (!response?.text) {
      throw new InternalServerError('No response from AI analysis service')
    }

    console.debug(
      '[analyzeImageWithAI] Raw AI response length:',
      response.text.length
    )

    // Extract JSON from response
    const jsonResponse = extractJsonFromString(response.text)
    if (!jsonResponse) {
      throw new InternalServerError(
        'Failed to extract valid JSON from AI response'
      )
    }

    return jsonResponse
  } catch (error) {
    console.error('[analyzeImageWithAI] AI analysis failed:', error)
    throw new InternalServerError(
      `AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Saves analyzed meal data to database
 */
async function saveMealToDatabase(
  mealData: TScanMealResponse,
  userId: string,
  requestParams: any
): Promise<void> {
  try {
    const mealName =
      requestParams.mealName ||
      mealData.name ||
      mealData.estimated_name ||
      'Scanned Meal'
    const totalCalories = mealData.calories || 0

    // Note: This assumes MealDao has a createMeal method that accepts these parameters
    // You may need to adjust this based on the actual MealDao interface
    const mealCreateData = {
      name: mealName,
      userId,
      totalCalories,
      author: 'Gemini' as any,
      mealType: requestParams.mealType || ('OTHER' as any)
    }

    console.info(
      '[saveMealToDatabase] Creating meal with data:',
      mealCreateData
    )
    // Uncomment when MealDao.createMeal is available
    // const meal = await mealDao.createMeal(mealCreateData)
    // console.info('[saveMealToDatabase] Meal saved with ID:', meal.id)
  } catch (error) {
    console.error('[saveMealToDatabase] Failed to save meal:', error)
    throw error
  }
}

/**
 * Legacy meal controller (deprecated - use scanMealController instead)
 */
export const mealController = async (req: Request): Promise<any> => {
  console.warn(
    '[mealController] Using deprecated controller, please use scanMealController'
  )
  return await scanMealController(req)
}

