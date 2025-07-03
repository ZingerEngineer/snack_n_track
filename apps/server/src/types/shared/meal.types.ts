/**
 * Unified meal types based on Prisma schema
 * This file provides type-safe interfaces that match the database schema
 * and align with frontend expectations
 */

import { MealType, FoodType, NutritionUnit, PortionUnit } from '@prisma/client'

// Re-export Prisma enums for convenience
export { MealType, FoodType, NutritionUnit, PortionUnit }

/**
 * Nutrition value with proper unit typing
 */
export interface INutritionValue {
  amount: number
  unit: NutritionUnit
}

/**
 * Vitamin information with typed units
 */
export interface IVitaminInfo {
  name: string
  value: INutritionValue
}

/**
 * Complete ingredient data matching Prisma Ingredient model
 */
export interface IIngredientData {
  id: string
  ingredientName: string

  calories: INutritionValue
  carbohydrates: INutritionValue
  proteins: INutritionValue
  fats: INutritionValue
  sugar: INutritionValue
  iron: INutritionValue
  sodium: INutritionValue
  potassium: INutritionValue
  vitaminC: INutritionValue
  vitaminB6: INutritionValue
  vitaminB12: INutritionValue
}

/**
 * Food item data matching Prisma FoodItem model
 */
export interface IFoodItemData {
  id: string
  foodName: string
  foodType: FoodType
  portionUnit: PortionUnit
  portionSizeValue: number
  ingredientString: string
  ingredients: IIngredientData[]
}

/**
 * Complete meal scan response interface
 * This is the unified response type that all meal scanning endpoints should return
 */
export interface IMealScanResponse {
  // Core identification
  certaintyPercentage: number
  mealName: string
  mealType: MealType

  // Food items array (can contain multiple detected items)
  foodItems: IFoodItemData[]

  // Aggregated nutrition totals for the entire meal
  totalNutrition: {
    calories: INutritionValue
    proteins: INutritionValue
    carbohydrates: INutritionValue
    fats: INutritionValue
    sugar: INutritionValue
    vitamins: IVitaminInfo[]
  }

  // Additional metadata
  ingredientsFound: string[]
  keywords?: string[]

  // Processing metadata
  source?: 'snackntrack' | 'gemini' | 'hybrid'
  processingTime?: number

  // Database reference if saved
  mealId?: string
}

/**
 * Legacy response interface for backward compatibility
 * @deprecated Use IMealScanResponse instead
 */
export interface ILegacyNutritionResponse {
  id: string
  certainty_percentage: number
  name: string
  keywords?: string[]
  type_of_food: FoodType
  proteins: string
  carbs: string
  fats: string
  vitamins: Array<{
    vitamin_name: string
    vitamin_portion: string
  }>
}

/**
 * Request interface for meal scanning
 */
export interface IMealScanRequest {
  userId?: string
  mealName?: string
  mealType?: MealType
  saveToHistory?: boolean
}

/**
 * Error response interface
 */
export interface IMealScanError {
  status: 'error'
  message: string
  code?: string
  details?: any
}

/**
 * Success wrapper for API responses
 */
export interface IMealScanSuccessResponse {
  status: 'success'
  data: IMealScanResponse
}

/**
 * Union type for all possible meal scan responses
 */
export type TMealScanApiResponse = IMealScanSuccessResponse | IMealScanError

/**
 * Database meal creation data
 */
export interface IMealCreationData {
  name: string
  userId?: string
  mealType: MealType
  totalCalories: number
  certaintyPercentage: number
  author: string
  source?: string
}

/**
 * Food item creation data for database
 */
export interface IFoodItemCreationData {
  foodName: string
  foodType: FoodType
  portionUnit: PortionUnit
  portionSizeValue: number
  ingredientString: string
}

/**
 * Ingredient creation data for database
 */
export interface IIngredientCreationData {
  ingredientName: string
  calories: number
  caloriesUnit: NutritionUnit
  carbohydratesAmount: number
  carbohydratesUnit: NutritionUnit
  proteinsAmount: number
  proteinsUnit: NutritionUnit
  fatsAmount: number
  fatsUnit: NutritionUnit
  sugarAmount: number
  sugarUnit: NutritionUnit
  ironAmount: number
  ironUnit: NutritionUnit
  sodiumAmount: number
  sodiumUnit: NutritionUnit
  potassiumAmount: number
  potassiumUnit: NutritionUnit
  vitaminC: number
  vitaminCUnit: NutritionUnit
  vitaminB6: number
  vitaminB6Unit: NutritionUnit
  vitaminB12: number
  vitaminB12Unit: NutritionUnit
}

