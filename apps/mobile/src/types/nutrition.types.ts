// Shared nutrition types
// This file contains types specifically for nutrition data and nutritional information

import type { TFoodType } from './food.types'

export type TNutritionUnit =
  // Mass units
  | 'g'
  | 'kg'
  | 'mg'
  | 'mcg'
  // Volume units
  | 'L'
  | 'mL'
  | 'mcL'
  // Energy units
  | 'kcal'
  | 'kJ'
  // Additional units
  | 'oz'
  | 'lb'

export interface IIngredientNutrition {
  id: string
  ingredientName: string

  calories: number
  caloriesUnit: TNutritionUnit

  carbohydratesAmount: number
  carbohydratesUnit: TNutritionUnit

  proteinsAmount: number
  proteinsUnit: TNutritionUnit

  fatsAmount: number
  fatsUnit: TNutritionUnit

  sugarAmount: number
  sugarUnit: TNutritionUnit

  ironAmount: number
  ironUnit: TNutritionUnit

  sodiumAmount: number
  sodiumUnit: TNutritionUnit

  potassiumAmount: number
  potassiumUnit: TNutritionUnit

  vitaminC: number
  vitaminCUnit: TNutritionUnit

  vitaminB6: number
  vitaminB6Unit: TNutritionUnit

  vitaminB12: number
  vitaminB12Unit: TNutritionUnit
}

export interface INutritionData {
  id: string
  certainty_percentage: number
  isSure: boolean
  name: string
  keywords?: Array<string> // Optional for mobile compatibility
  type_of_food: TFoodType
  proteins: string
  carbs: string
  fats: string
  vitamins: Array<{
    vitamin_name: string
    vitamin_portion: string
  }>
}

// Legacy interface for backward compatibility
export interface IEstimatedNutritionData {
  id: string
  certainty_percentage: number
  isSure: boolean
  estimated_name: string
  estimated_typeOfFood: TFoodType // Updated to use new enum
}

// Re-export commonly used types for convenience
export type { TFoodType, TTypeOfFood } from './food.types'
