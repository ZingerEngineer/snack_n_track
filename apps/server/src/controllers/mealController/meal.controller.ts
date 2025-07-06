import { UnauthorizedError } from '../../classes/Error'

import { HybridMealScanService } from './utils/hybridScanService'
import MealDao from '../../daos/meal.dao'
import { AuthenticatedRequest } from '../../types/shared.types'
import { validatedMealScan } from '../../schemas/meal.zod'

// Initialize singletons

const mealDao = new MealDao()

export const scanMealHybridController = async (
  req: AuthenticatedRequest
): Promise<validatedMealScan[]> => {
  try {
    console.info(
      '[scanMealHybridController] Request received at',
      new Date().toISOString()
    )

    const userId = req.user?.userId
    if (!userId) {
      throw new UnauthorizedError('User not authenticated')
    }
    console.info('[scanMealHybridController] User ID:', userId)
    // Use hybrid scanning service
    const {
      response: scanResult,
      source,
      confidence
    } = await HybridMealScanService.scanMealHybrid(req)
    console.info(
      '[scanMealHybridController] Hybrid scan completed successfully',
      { source, confidence }
    )
    return scanResult
  } catch (error) {
    console.error(
      '[scanMealHybridController] Error processing hybrid scan request:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    return []
  }
}

