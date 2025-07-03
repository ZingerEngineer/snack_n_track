import { Request } from 'express'
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
  UnauthorizedError
} from '../classes/Error'
import { ConcurrencyManager } from '../utils/concurrencyManager'
import {
  ScanMealResponseSchema,
  TScanMealResponse
} from '../schemas/meal/scanMeal.zod'

import {
  analyzeImageWithAI,
  saveMealToDatabase,
  MealFileService,
  MealValidationService,
  MealResponseService
} from './mealController'
import { HybridMealScanService } from './mealController/hybridScanService'
import MealDao from '../daos/meal.dao'
// Initialize singletons
const concurrencyManager = ConcurrencyManager.getInstance()
const mealDao = new MealDao()

export const scanMealHybridController = async (
  req: Request
): Promise<TScanMealResponse & { source: string; confidence: number }> => {
  const startTime = Date.now()
  let operationId: string | null = null

  try {
    console.info(
      '[scanMealHybridController] Request received at',
      new Date().toISOString()
    )

    // Acquire concurrency slot
    const userId = (req as any).user?.id
    operationId = await concurrencyManager.acquireSlot('scan', userId)
    console.info(
      '[scanMealHybridController] Concurrency slot acquired:',
      operationId
    )

    // Use hybrid scanning service
    const {
      response: scanResult,
      source,
      confidence
    } = await HybridMealScanService.scanMealHybrid(req)

    // Validate AI response structure
    const validatedResponse = ScanMealResponseSchema.parse(scanResult)
    console.info(
      '[scanMealHybridController] Response validated successfully:',
      {
        source,
        confidence: Math.round(confidence * 100)
      }
    )

    // Get request parameters for saving
    const requestParams = req.body || {}

    // Save meal to database if requested and user is authenticated
    if (requestParams.saveToHistory !== false && userId) {
      try {
        await HybridMealScanService.saveMealResult(
          validatedResponse,
          userId,
          requestParams,
          source
        )
        console.info(
          '[scanMealHybridController] Meal saved to database with source:',
          source
        )
      } catch (saveError) {
        console.warn(
          '[scanMealHybridController] Failed to save meal to database:',
          saveError
        )
        // Don't fail the entire request if saving fails
      }
    }

    // Log performance metrics
    MealResponseService.logPerformanceMetrics(
      startTime,
      userId,
      validatedResponse
    )

    // Return response with metadata
    const responseWithMetadata = {
      ...MealResponseService.formatSuccessResponse(validatedResponse),
      source,
      confidence: Math.round(confidence * 100)
    }

    return responseWithMetadata
  } catch (error) {
    // Log error information
    MealResponseService.logError(startTime, (req as any).user?.id, error)

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
        '[scanMealHybridController] Concurrency slot released:',
        operationId
      )
    }
  }
}

/**
 * Enhanced meal scanning controller with security, validation, and concurrency control
 * Uses Gemini AI exclusively for image analysis
 */
export const scanMealGeminiController = async (
  req: Request
): Promise<TScanMealResponse> => {
  const startTime = Date.now()
  let operationId: string | null = null

  try {
    console.info(
      '[scanMealGeminiController] Request received at',
      new Date().toISOString()
    )

    // Validate user and check rate limits
    const { userId, userEmail } =
      await MealValidationService.validateUserAndRateLimit(req)

    // Validate request parameters and file
    const { requestParams, validatedFile } =
      MealValidationService.validateRequestAndFile(req)

    // Acquire concurrency slot
    operationId = await concurrencyManager.acquireSlot('scan', userId)
    console.info(
      '[scanMealGeminiController] Concurrency slot acquired:',
      operationId
    )

    // Validate user permissions
    await MealValidationService.validateUserPermissions(userId, requestParams)

    // Upload file and get public URL
    const { publicUrl, fileName } =
      await MealFileService.uploadAndPrepareFile(validatedFile)

    // Clean up local file immediately after upload
    await MealFileService.cleanupLocalFile(validatedFile.path, 'Local')

    // Download file for processing
    const finalFilePath = await MealFileService.downloadFileForProcessing(
      publicUrl,
      fileName
    )

    // Call AI service for analysis
    const aiResponse = await analyzeImageWithAI(
      finalFilePath,
      requestParams.mealName
    )

    // Clean up downloaded file
    await MealFileService.cleanupLocalFile(finalFilePath, 'Downloaded')

    // Validate AI response structure
    const validatedResponse = ScanMealResponseSchema.parse(aiResponse)
    console.info(
      '[scanMealGeminiController] AI response validated successfully'
    )

    // Save meal to database if requested and user is authenticated
    if (requestParams.saveToHistory !== false && userId) {
      try {
        await saveMealToDatabase(validatedResponse, userId, requestParams)
        console.info('[scanMealGeminiController] Meal saved to database')
      } catch (saveError) {
        console.warn(
          '[scanMealGeminiController] Failed to save meal to database:',
          saveError
        )
        // Don't fail the entire request if saving fails
      }
    }

    // Log performance metrics
    MealResponseService.logPerformanceMetrics(
      startTime,
      userId,
      validatedResponse
    )

    return MealResponseService.formatSuccessResponse(validatedResponse)
  } catch (error) {
    // Log error information
    MealResponseService.logError(startTime, (req as any).user?.id, error)

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
        '[scanMealGeminiController] Concurrency slot released:',
        operationId
      )
    }
  }
}

/**
 * Legacy meal controller (deprecated - use scanMealController instead)
 */
export const mealController = async (req: Request): Promise<any> => {
  console.warn(
    '[mealController] Using deprecated controller, please use scanMealController'
  )
  return await scanMealGeminiController(req)
}

