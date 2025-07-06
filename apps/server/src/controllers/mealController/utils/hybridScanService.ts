import { AuthenticatedRequest } from '../../../types/shared.types'
import { THybridResponse, TScanMeal } from '../../../types/meal.types'
import { InternalServerError, ValidationError } from '../../../classes/Error'
import { MealFileService } from './fileService'
import { validateUploadedFile } from '../../../utils/fileValidation'
import {
  snacknTrackModelService,
  SnacknTrackModelService
} from './snacknTrackModelService'
import { analyzeImageWithAI } from './aiAnalysisService'
import FoodItemDao from '../../../daos/foodItem.dao'
import { $Enums } from '@prisma/client'
import { ScanMealSchema, validatedMealScan } from '../../../schemas/meal.zod'

/**
 * Hybrid meal scanning service that combines SnacknTrack model with Gemini fallback
 */
export class HybridMealScanService {
  private static readonly CONFIDENCE_THRESHOLD = 0.3
  private static readonly snacknTrackModelService =
    new SnacknTrackModelService()
  /**
   * Scan meal using hybrid approach (SnacknTrack first, Gemini fallback)
   */
  static async scanMealHybrid(req: AuthenticatedRequest): Promise<{
    response: validatedMealScan[]
    source: 'SnacknTrack' | 'Gemini'
    confidence: number
  }> {
    let hybridResponse: THybridResponse
    // Validate user permissions
    const userId = req.user?.userId
    if (!userId) {
      throw new ValidationError('User not authenticated')
    }

    const file = req.file
    if (!file) {
      throw new ValidationError('No file uploaded')
    }

    const validatedFile = validateUploadedFile(file)

    // Upload file and get public URL
    const { publicUrl, fileName } = await MealFileService.uploadAndPrepareFile(
      validatedFile as Express.Multer.File
    )

    // Clean up local file immediately after upload
    await MealFileService.cleanupLocalFile(validatedFile.path, 'Local')
    const geminiFilePath = await MealFileService.downloadFileForProcessing(
      publicUrl,
      validatedFile.filename + '.' + validatedFile.mimetype.split('/')[1]
    )
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
            0.3 // Lower threshold for initial detection
          )

          if (
            snacknTrackResponse.status === 'completed' &&
            snacknTrackResponse.detections.length > 0
          ) {
            console.info(
              '[HybridMealScanService] SnacknTrack scan completed successfully',
              {
                detections: snacknTrackResponse.detections.length,
                processingTime: snacknTrackResponse.processing_time
              }
            )
            // Create a Map to keep the highest confidence for each unique class_index
            const classIdConfidenceMap = new Map<number, number>()
            snacknTrackResponse.detections.forEach((detection) => {
              const existingConfidence = classIdConfidenceMap.get(
                detection.class_index
              )
              if (
                existingConfidence === undefined ||
                detection.confidence > existingConfidence
              ) {
                classIdConfidenceMap.set(
                  detection.class_index,
                  detection.confidence
                )
              }
            })

            const classIds = Array.from(classIdConfidenceMap.keys())
            const foodItemDao = new FoodItemDao()
            let dbFoodItems: {
              foodName: string
              id: number
              foodType: $Enums.FoodType
              portionUnit: $Enums.PortionUnit
              portionSizeValue: number
              ingredientString: string
              createdAt: Date
              updatedAt: Date | null
              deletedAt: Date | null
            }[] = []
            let foodItems = []
            if (classIds.length > 0) {
              classIds.map(async (classId) => {
                dbFoodItems.push(await foodItemDao.getFoodItemById(classId))
              })
              foodItems = dbFoodItems.map((item) => ({
                id: item.id.toString(),
                name: item.foodName,
                foodType: item.foodType,
                portionUnit: item.portionUnit,
                portionSizeValue: item.portionSizeValue,
                ingredientString: item.ingredientString
              }))

              const snackModelGuidance = `
            Found food items: ${JSON.stringify(foodItems)}
            `
              //Finished using snacknTrack, now we run gemini analysis with food found Items.
              hybridResponse = await analyzeImageWithAI(
                geminiFilePath,
                snackModelGuidance
              )
              hybridResponse.forEach((meal) => {
                meal.userId = userId
              })
            }
          }
        } catch (error) {
          console.error(
            '[HybridMealScanService] SnacknTrack scan failed, falling back to Gemini',
            error
          )
        }
      }

      hybridResponse = await analyzeImageWithAI(
        geminiFilePath,
        '' // No snack model guidance for Gemini fallback
      )
      hybridResponse.forEach((meal) => {
        meal.userId = userId
      })
      console.log('Hybrid Response: ', hybridResponse)
      let validatedMeals: validatedMealScan[] = []
      // Ensure hybridResponse is an array before iterating
      const hybridMeals = Array.isArray(hybridResponse)
        ? hybridResponse
        : [hybridResponse]
      for (const meal of hybridMeals) {
        try {
          const validatedMeal = ScanMealSchema.parse(meal)
          validatedMeals.push(validatedMeal)
        } catch (error) {
          console.error(
            '[HybridMealScanService] Failed to validate meal response',
            error
          )
          throw new ValidationError(
            `Invalid meal response structure: ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        }
      }
      console.info(
        '[HybridMealScanService] Gemini scan completed successfully',
        {
          response: validatedMeals,
          fileName,
          publicUrl
        }
      )
      // Return response with source and confidence
      return {
        response: validatedMeals,
        source: 'Gemini',
        confidence: 1.0 // Gemini always returns full confidence
      }
    } catch (error) {
      console.error(
        '[HybridMealScanService] Error during hybrid scan process',
        error
      )
      throw new InternalServerError(
        `Hybrid scan failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }
}

