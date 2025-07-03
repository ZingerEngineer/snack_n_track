import { TScanMealResponse } from '../../schemas/meal/scanMeal.zod'
import {
  TMealScanResponse,
  TMealScanSuccessResponse
} from '../../schemas/meal/unified.meal.zod'
import {
  IMealScanResponse,
  IMealScanSuccessResponse
} from '../../types/shared/meal.types'
import {
  convertLegacyToUnified,
  convertUnifiedToLegacy
} from '../../utils/mealResponseUtils'

/**
 * Enhanced service for handling response operations in meal scanning
 * Supports both legacy and unified response formats
 */
export class MealResponseService {
  /**
   * Logs performance metrics for the request (unified format)
   */
  static logPerformanceMetrics(
    startTime: number,
    userId: string,
    response: IMealScanResponse | TScanMealResponse
  ): void {
    const duration = Date.now() - startTime

    // Handle both unified and legacy response formats
    if ('certaintyPercentage' in response) {
      // Unified format
      console.info('[MealResponseService] Request completed successfully:', {
        duration: `${duration}ms`,
        userId,
        certainty: response.certaintyPercentage,
        mealName: response.mealName,
        mealType: response.mealType,
        foodItemsCount: response.foodItems.length,
        source: response.source
      })
    } else {
      // Legacy format
      console.info(
        '[MealResponseService] Request completed successfully (legacy):',
        {
          duration: `${duration}ms`,
          userId,
          certainty: response.certainty_percentage,
          foodType: response.type_of_food || response.estimated_typeOfFood
        }
      )
    }
  }

  /**
   * Logs error information
   */
  static logError(startTime: number, userId: string, error: any): void {
    const duration = Date.now() - startTime
    console.error('[MealResponseService] Error occurred:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: `${duration}ms`,
      userId,
      stack: error instanceof Error ? error.stack : undefined
    })
  }

  /**
   * Formats successful response with additional metadata (legacy format)
   */
  static formatSuccessResponse(
    response: TScanMealResponse,
    metadata?: any
  ): TScanMealResponse {
    // Add any additional metadata if needed
    return response
  }

  /**
   * Formats successful response in unified format
   */
  static formatUnifiedSuccessResponse(
    response: IMealScanResponse,
    metadata?: { source?: string; processingTime?: number }
  ): IMealScanSuccessResponse {
    const enhancedResponse: IMealScanResponse = {
      ...response,
      source: (metadata?.source as any) || response.source,
      processingTime: metadata?.processingTime || response.processingTime
    }

    return {
      status: 'success',
      data: enhancedResponse
    }
  }

  /**
   * Convert legacy response to unified format
   */
  static convertToUnified(
    legacyResponse: TScanMealResponse
  ): Partial<IMealScanResponse> {
    return convertLegacyToUnified(legacyResponse)
  }

  /**
   * Convert unified response to legacy format for backward compatibility
   */
  static convertToLegacy(unifiedResponse: IMealScanResponse): any {
    return convertUnifiedToLegacy(unifiedResponse)
  }

  /**
   * Create error response
   */
  static createErrorResponse(
    message: string,
    code?: string,
    details?: any
  ): any {
    return {
      status: 'error',
      message,
      code,
      details
    }
  }

  /**
   * Validate and sanitize response data
   */
  static validateResponseData(response: any): boolean {
    try {
      // Basic validation for required fields
      if ('certaintyPercentage' in response) {
        // Unified format validation
        return (
          typeof response.certaintyPercentage === 'number' &&
          response.certaintyPercentage >= 0 &&
          response.certaintyPercentage <= 100 &&
          typeof response.mealName === 'string' &&
          response.mealName.trim().length > 0 &&
          Array.isArray(response.foodItems) &&
          response.foodItems.length > 0
        )
      } else {
        // Legacy format validation
        return (
          typeof response.certainty_percentage === 'number' &&
          response.certainty_percentage >= 0 &&
          response.certainty_percentage <= 100
        )
      }
    } catch (error) {
      console.error('[MealResponseService] Response validation error:', error)
      return false
    }
  }

  /**
   * Calculate response quality score based on various factors
   */
  static calculateQualityScore(response: IMealScanResponse): number {
    let score = 0
    const maxScore = 100

    // Base score from certainty percentage (40% weight)
    score += (response.certaintyPercentage / 100) * 40

    // Food items detail quality (20% weight)
    const avgIngredientsPerItem =
      response.foodItems.reduce(
        (sum, item) => sum + item.ingredients.length,
        0
      ) / response.foodItems.length
    score += Math.min(avgIngredientsPerItem / 5, 1) * 20

    // Nutrition data completeness (20% weight)
    const nutritionFields = [
      response.totalNutrition.calories.amount,
      response.totalNutrition.proteins.amount,
      response.totalNutrition.carbohydrates.amount,
      response.totalNutrition.fats.amount
    ]
    const nutritionCompleteness =
      nutritionFields.filter((val) => val > 0).length / nutritionFields.length
    score += nutritionCompleteness * 20

    // Ingredients found quality (20% weight)
    const ingredientsQuality = Math.min(response.ingredientsFound.length / 3, 1)
    score += ingredientsQuality * 20

    return Math.round(score)
  }

  /**
   * Generate response summary for logging
   */
  static generateResponseSummary(response: IMealScanResponse): string {
    const qualityScore = this.calculateQualityScore(response)
    return [
      `Meal: ${response.mealName}`,
      `Certainty: ${response.certaintyPercentage}%`,
      `Food Items: ${response.foodItems.length}`,
      `Ingredients: ${response.ingredientsFound.length}`,
      `Quality Score: ${qualityScore}/100`,
      `Source: ${response.source || 'unknown'}`
    ].join(' | ')
  }
}

