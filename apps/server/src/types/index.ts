/**
 * Unified meal types and utilities export
 * This file provides a single entry point for all meal-related types and utilities
 */

// Type definitions
export * from './shared/meal.types'

// Zod schemas and validation (unified)
export {
  MealTypeSchema,
  FoodTypeSchema,
  NutritionUnitSchema,
  PortionUnitSchema,
  NutritionValueSchema,
  VitaminInfoSchema,
  IngredientDataSchema,
  FoodItemDataSchema,
  TotalNutritionSchema,
  MealScanResponseSchema,
  MealScanRequestSchema,
  MealScanSuccessResponseSchema,
  MealScanErrorResponseSchema,
  MealScanApiResponseSchema,
  MealCreationDataSchema,
  FoodItemCreationDataSchema,
  IngredientCreationDataSchema,
  // Type exports
  type TMealScanResponse,
  type TMealScanRequest,
  type TMealScanSuccessResponse,
  type TMealScanErrorResponse,
  type TMealScanApiResponse as TUnifiedMealScanApiResponse,
  type TNutritionValue as TUnifiedNutritionValue,
  type TVitaminInfo,
  type TIngredientData,
  type TFoodItemData,
  type TTotalNutrition,
  type TMealCreationData,
  type TFoodItemCreationData,
  type TIngredientCreationData,
  createNutritionValueFromString,
  isValidNutritionValue as isValidUnifiedNutritionValue
} from '../schemas/meal/unified.meal.zod'

// Services
export { MealDataService } from '../services/mealDataService'
export { MealResponseAdapter } from '../services/mealResponseAdapter'

// Utilities
export {
  parseNutritionString,
  formatNutritionValue,
  convertLegacyFoodType,
  convertLegacyToUnified,
  convertUnifiedToLegacy,
  convertLegacyVitamins,
  generateTempId,
  isValidNutritionValue as isValidLegacyNutritionValue,
  sanitizeMealScanResponse,
  calculateTotalNutrition
} from '../utils/mealResponseUtils'

// Migration utilities
export {
  MealTypeMigration,
  runMigrationAnalysis
} from '../utils/mealTypesMigration'

// Legacy compatibility (deprecated - use unified types instead)
export {
  FileUploadSchema as LegacyFileUploadSchema,
  ScanMealRequestSchema as LegacyScanMealRequestSchema,
  ScanMealResponseSchema as LegacyScanMealResponseSchema,
  DetailedNutritionResponseSchema,
  type TScanMealRequest as TLegacyScanMealRequest,
  type TScanMealResponse as TLegacyScanMealResponse,
  type TDetailedNutritionResponse,
  type TFileUpload as TLegacyFileUpload,
  type TNutritionValue as TLegacyNutritionValue
} from '../schemas/meal/scanMeal.zod'

/**
 * Version information for tracking migration progress
 */
export const MEAL_TYPES_VERSION = {
  version: '2.0.0',
  compatibility: {
    legacy: true,
    unified: true
  },
  migrationStatus: 'in-progress',
  lastUpdated: '2025-07-02'
}

