import { Request } from 'express'
import { TScanMealResponse } from '../../schemas/meal/scanMeal.zod'
import { MealAuthor } from '../../types/meal/meal.types'
import { NutritionParsingUtils } from './nutritionParsingUtils'
import {
  MealFileService,
  MealValidationService,
  MealResponseService,
  analyzeImageWithAI,
  saveMealToDatabase
} from './index'
import {
  snacknTrackModelService,
  SnacknTrackScanResponse,
  SnacknTrackDetection
} from './snacknTrackModelService'
import { InternalServerError, ValidationError } from '../../classes/Error'

/**
 * Hybrid meal scanning service that combines SnacknTrack model with Gemini fallback
 */
export class HybridMealScanService {
  private static readonly CONFIDENCE_THRESHOLD = 0.7 // 70% threshold

  /**
   * Convert SnacknTrack detections to meal response format
   */
  private static convertSnacknTrackToMealResponse(
    response: SnacknTrackScanResponse,
    requestParams: any
  ): TScanMealResponse {
    const mostConfidentDetection =
      snacknTrackModelService.getMostConfidentDetection(response.detections)
    const highestConfidence = snacknTrackModelService.getHighestConfidence(
      response.detections
    )

    if (!mostConfidentDetection) {
      throw new ValidationError('No detections found in SnacknTrack response')
    }

    // Create a meal response based on the detection
    const mealResponse: TScanMealResponse = {
      certainty_percentage: Math.round(highestConfidence * 100),
      name: mostConfidentDetection.class_name,
      keywords: [mostConfidentDetection.class_name, 'food', 'detected'],
      type_of_food: 'MEAL', // Default type since SnacknTrack detects food objects

      // Placeholder nutritional data - in a real implementation,
      // you would have a mapping from food classes to nutritional info
      proteins: { amount: 0, unit: 'g' },
      carbs: { amount: 0, unit: 'g' },
      fats: { amount: 0, unit: 'g' },
      calories: { amount: 0, unit: 'kcal' },
      vitamins: []
    }

    // Add metadata as additional properties (not part of the schema)
    ;(mealResponse as any).processing_time = response.processing_time
    ;(mealResponse as any).detections = response.detections
    ;(mealResponse as any).source = 'SnacknTrack'
    ;(mealResponse as any).author = MealAuthor.SnackModel

    return mealResponse
  }

  /**
   * Scan meal using hybrid approach (SnacknTrack first, Gemini fallback)
   */
  static async scanMealHybrid(req: Request): Promise<{
    response: TScanMealResponse
    source: 'SnacknTrack' | 'Gemini'
    confidence: number
  }> {
    // Validate user and check rate limits
    const { userId } = await MealValidationService.validateUserAndRateLimit(req)

    // Validate request parameters and file
    const { requestParams, validatedFile } =
      MealValidationService.validateRequestAndFile(req)

    // Validate user permissions
    await MealValidationService.validateUserPermissions(userId, requestParams)

    // Upload file and get public URL
    const { publicUrl, fileName } =
      await MealFileService.uploadAndPrepareFile(validatedFile)

    // Clean up local file immediately after upload
    await MealFileService.cleanupLocalFile(validatedFile.path, 'Local')

    try {
      // Step 1: Try SnacknTrack model first
      console.info(
        '[HybridMealScanService] Attempting SnacknTrack model scan...'
      )

      const isSnacknTrackAvailable =
        await snacknTrackModelService.isServiceAvailable()

      if (isSnacknTrackAvailable) {
        try {
          const snacknTrackResponse = await snacknTrackModelService.scanImage(
            publicUrl,
            0.5 // Lower threshold for initial detection
          )

          if (
            snacknTrackResponse.status === 'completed' &&
            snacknTrackResponse.detections.length > 0
          ) {
            const highestConfidence =
              snacknTrackModelService.getHighestConfidence(
                snacknTrackResponse.detections
              )

            console.info(
              '[HybridMealScanService] SnacknTrack scan completed:',
              {
                detections: snacknTrackResponse.detections.length,
                highestConfidence: Math.round(highestConfidence * 100),
                processingTime: snacknTrackResponse.processing_time
              }
            )

            // Check if confidence meets threshold
            if (highestConfidence >= this.CONFIDENCE_THRESHOLD) {
              console.info(
                '[HybridMealScanService] SnacknTrack confidence above threshold, using SnacknTrack result'
              )

              const mealResponse = this.convertSnacknTrackToMealResponse(
                snacknTrackResponse,
                requestParams
              )

              // Clean up SnacknTrack request (optional)
              await snacknTrackModelService.cleanupScan(
                snacknTrackResponse.request_id
              )

              return {
                response: mealResponse,
                source: 'SnacknTrack',
                confidence: highestConfidence
              }
            } else {
              console.info(
                `[HybridMealScanService] SnacknTrack confidence ${Math.round(highestConfidence * 100)}% below threshold ${Math.round(this.CONFIDENCE_THRESHOLD * 100)}%, falling back to Gemini`
              )
            }
          } else {
            console.warn(
              '[HybridMealScanService] SnacknTrack scan failed or no detections found, falling back to Gemini'
            )
          }
        } catch (snacknTrackError) {
          console.warn(
            '[HybridMealScanService] SnacknTrack scan error, falling back to Gemini:',
            snacknTrackError instanceof Error
              ? snacknTrackError.message
              : 'Unknown error'
          )
        }
      } else {
        console.warn(
          '[HybridMealScanService] SnacknTrack service not available, using Gemini'
        )
      }

      // Step 2: Fallback to Gemini approach
      console.info('[HybridMealScanService] Using Gemini approach...')

      // Download file for Gemini processing
      const finalFilePath = await MealFileService.downloadFileForProcessing(
        publicUrl,
        fileName
      )

      try {
        // Call Gemini AI service for analysis
        const geminiResponse = await analyzeImageWithAI(
          finalFilePath,
          requestParams.mealName
        )

        // Clean up downloaded file
        await MealFileService.cleanupLocalFile(finalFilePath, 'Downloaded')

        console.info(
          '[HybridMealScanService] Gemini scan completed successfully'
        )

        return {
          response: {
            ...geminiResponse,
            source: 'Gemini',
            author: MealAuthor.Gemini
          },
          source: 'Gemini',
          confidence: geminiResponse.certainty_percentage / 100
        }
      } catch (geminiError) {
        // Clean up downloaded file even on error
        await MealFileService.cleanupLocalFile(finalFilePath, 'Downloaded')
        throw geminiError
      }
    } catch (error) {
      console.error('[HybridMealScanService] Hybrid scan failed:', error)
      throw error
    }
  }

  /**
   * Save meal result to database with proper source attribution
   */
  static async saveMealResult(
    mealData: TScanMealResponse,
    userId: string,
    requestParams: any,
    source: 'SnacknTrack' | 'Gemini'
  ): Promise<void> {
    // Ensure the source is properly set in the meal data
    const mealDataWithSource = {
      ...mealData,
      source,
      author:
        source === 'SnacknTrack' ? MealAuthor.SnackModel : MealAuthor.Gemini
    }

    await saveMealToDatabase(mealDataWithSource, userId, requestParams)
  }
}

