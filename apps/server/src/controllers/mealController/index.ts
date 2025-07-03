/**
 * Meal Controller Utilities
 *
 * This module exports all utility services used by the meal controller.
 * Each service handles a specific aspect of meal processing:
 *
 * - aiAnalysisService: Handles AI-powered image analysis
 * - databaseService: Manages meal data persistence
 * - fileService: Handles file upload, download, and cleanup operations
 * - validationService: Validates requests, users, and permissions
 * - responseService: Formats responses and logs performance metrics
 */

export { analyzeImageWithAI } from './aiAnalysisService'
export { saveMealToDatabase } from './databaseService'
export { MealFileService } from './fileService'
export { MealValidationService } from './validationService'
export { MealResponseService } from './responseService'
export {
  snacknTrackModelService,
  SnacknTrackModelService
} from './snacknTrackModelService'
export { HybridMealScanService } from './hybridScanService'
export { NutritionParsingUtils } from './nutritionParsingUtils'

/**
 * Utility types for meal controller operations
 */
export interface MealProcessingContext {
  userId: string
  userEmail: string
  requestParams: any
  validatedFile: any
  startTime: number
  operationId?: string
}

export interface FileProcessingResult {
  publicUrl: string
  fileName: string
  sanitizedFileName: string
}

export interface AnalysisResult {
  response: any
  processingTime: number
  certainty: number
}

