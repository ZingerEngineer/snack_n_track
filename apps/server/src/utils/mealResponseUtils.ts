/**
 * Utilities for converting between legacy and new meal response formats
 * These utilities help maintain backward compatibility while migrating to the new type system
 */

import { FoodType, MealType, NutritionUnit } from '@prisma/client'
import {
  IMealScanResponse,
  ILegacyNutritionResponse,
  INutritionValue,
  IVitaminInfo,
  IIngredientData,
  IFoodItemData
} from '../types/shared/meal.types'
import { TScanMealResponse } from '../schemas/meal/scanMeal.zod'

/**
 * Parse nutrition string values like "150mg", "20g" into structured format
 */
export function parseNutritionString(value: string | number): INutritionValue {
  if (typeof value === 'number') {
    return { amount: value, unit: NutritionUnit.g }
  }

  const str = String(value).trim()

  // Match patterns like "150mg", "20g", "1.5kg", etc.
  const match = str.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/)

  if (match) {
    const amount = parseFloat(match[1])
    const unitStr = match[2].toLowerCase()

    // Map string units to NutritionUnit enum
    const unitMap: Record<string, NutritionUnit> = {
      g: NutritionUnit.g,
      kg: NutritionUnit.kg,
      mg: NutritionUnit.mg,
      mcg: NutritionUnit.mcg,
      l: NutritionUnit.L,
      ml: NutritionUnit.mL,
      mcl: NutritionUnit.mcL,
      kcal: NutritionUnit.kcal,
      kj: NutritionUnit.kJ,
      oz: NutritionUnit.oz,
      lb: NutritionUnit.lb
    }

    const unit = unitMap[unitStr] || NutritionUnit.g
    return { amount, unit }
  }

  // Try to parse as number with default unit
  const numericValue = parseFloat(str)
  if (!isNaN(numericValue)) {
    return { amount: numericValue, unit: NutritionUnit.g }
  }

  // Fallback
  return { amount: 0, unit: NutritionUnit.g }
}

/**
 * Format nutrition value back to string for legacy compatibility
 */
export function formatNutritionValue(nutrition: INutritionValue): string {
  return `${nutrition.amount}${nutrition.unit}`
}

/**
 * Convert legacy food type strings to FoodType enum
 */
export function convertLegacyFoodType(legacyType: string): FoodType {
  const typeMap: Record<string, FoodType> = {
    Vegetable: FoodType.VEGETABLE,
    VEGETABLE: FoodType.VEGETABLE,
    Fruit: FoodType.FRUIT,
    FRUIT: FoodType.FRUIT,
    Grain: FoodType.GRAIN,
    GRAIN: FoodType.GRAIN,
    Dessert: FoodType.DESSERT,
    DESSERT: FoodType.DESSERT,
    Beverage: FoodType.BEVERAGE,
    BEVERAGE: FoodType.BEVERAGE,
    Meal: FoodType.MEAL,
    MEAL: FoodType.MEAL
  }

  return typeMap[legacyType] || FoodType.MEAL
}

/**
 * Convert legacy vitamin array to structured vitamin info
 */
export function convertLegacyVitamins(
  vitamins: Array<{ vitamin_name: string; vitamin_portion: string }>
): IVitaminInfo[] {
  return vitamins.map((vitamin) => ({
    name: vitamin.vitamin_name,
    value: parseNutritionString(vitamin.vitamin_portion)
  }))
}

/**
 * Convert legacy scan response to new unified format
 */
export function convertLegacyToUnified(
  legacy: TScanMealResponse
): Partial<IMealScanResponse> {
  const foodType = legacy.type_of_food || legacy.estimated_typeOfFood
  const mealName = legacy.name || legacy.estimated_name || 'Unknown Meal'

  // Create a single food item from legacy data
  const foodItem: IFoodItemData = {
    id: generateTempId(),
    foodName: mealName,
    foodType: foodType ? convertLegacyFoodType(foodType) : FoodType.MEAL,
    portionUnit: 'SERVING' as any, // Default portion
    portionSizeValue: 1,
    ingredientString: legacy.keywords?.join(', ') || '',
    ingredients: [] // Will be populated if ingredient data is available
  }

  // Parse nutrition values
  const proteins = legacy.proteins
    ? parseNutritionString(legacy.proteins as any)
    : { amount: 0, unit: NutritionUnit.g }
  const carbs = legacy.carbs
    ? parseNutritionString(legacy.carbs as any)
    : { amount: 0, unit: NutritionUnit.g }
  const fats = legacy.fats
    ? parseNutritionString(legacy.fats as any)
    : { amount: 0, unit: NutritionUnit.g }
  const calories = legacy.calories
    ? parseNutritionString(legacy.calories as any)
    : { amount: 0, unit: NutritionUnit.kcal }

  // Convert vitamins
  const vitamins = legacy.vitamins
    ? convertLegacyVitamins(legacy.vitamins as any)
    : []

  return {
    certaintyPercentage: legacy.certainty_percentage || 0,
    mealName,
    mealType: MealType.OTHER, // Default meal type
    foodItems: [foodItem],
    totalNutrition: {
      calories,
      proteins,
      carbohydrates: carbs,
      fats,
      sugar: { amount: 0, unit: NutritionUnit.g }, // Default if not provided
      vitamins
    },
    ingredientsFound: legacy.keywords || [],
    keywords: legacy.keywords
  }
}

/**
 * Convert new unified format back to legacy for backward compatibility
 */
export function convertUnifiedToLegacy(
  unified: IMealScanResponse
): ILegacyNutritionResponse {
  const primaryFoodItem = unified.foodItems[0]

  return {
    id: unified.mealId || generateTempId(),
    certainty_percentage: unified.certaintyPercentage,
    name: unified.mealName,
    keywords: unified.keywords,
    type_of_food: primaryFoodItem?.foodType || FoodType.MEAL,
    proteins: formatNutritionValue(unified.totalNutrition.proteins),
    carbs: formatNutritionValue(unified.totalNutrition.carbohydrates),
    fats: formatNutritionValue(unified.totalNutrition.fats),
    vitamins: unified.totalNutrition.vitamins.map((vitamin) => ({
      vitamin_name: vitamin.name,
      vitamin_portion: formatNutritionValue(vitamin.value)
    }))
  }
}

/**
 * Generate a temporary ID for items without database IDs
 */
export function generateTempId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Validate nutrition value structure
 */
export function isValidNutritionValue(value: any): value is INutritionValue {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.amount === 'number' &&
    value.amount >= 0 &&
    typeof value.unit === 'string' &&
    Object.values(NutritionUnit).includes(value.unit as NutritionUnit)
  )
}

/**
 * Sanitize and validate meal scan response
 */
export function sanitizeMealScanResponse(
  response: any
): Partial<IMealScanResponse> {
  const sanitized: Partial<IMealScanResponse> = {}

  // Validate and set certainty percentage
  if (
    typeof response.certaintyPercentage === 'number' &&
    response.certaintyPercentage >= 0 &&
    response.certaintyPercentage <= 100
  ) {
    sanitized.certaintyPercentage = response.certaintyPercentage
  } else if (typeof response.certainty_percentage === 'number') {
    sanitized.certaintyPercentage = Math.max(
      0,
      Math.min(100, response.certainty_percentage)
    )
  } else {
    sanitized.certaintyPercentage = 0
  }

  // Validate and set meal name
  if (typeof response.mealName === 'string' && response.mealName.trim()) {
    sanitized.mealName = response.mealName.trim()
  } else if (typeof response.name === 'string' && response.name.trim()) {
    sanitized.mealName = response.name.trim()
  } else if (
    typeof response.estimated_name === 'string' &&
    response.estimated_name.trim()
  ) {
    sanitized.mealName = response.estimated_name.trim()
  } else {
    sanitized.mealName = 'Unknown Meal'
  }

  // Validate and set meal type
  if (Object.values(MealType).includes(response.mealType)) {
    sanitized.mealType = response.mealType
  } else {
    sanitized.mealType = MealType.OTHER
  }

  return sanitized
}

/**
 * Calculate total nutrition from food items
 */
export function calculateTotalNutrition(
  foodItems: IFoodItemData[]
): IMealScanResponse['totalNutrition'] {
  const totals = {
    calories: { amount: 0, unit: NutritionUnit.kcal },
    proteins: { amount: 0, unit: NutritionUnit.g },
    carbohydrates: { amount: 0, unit: NutritionUnit.g },
    fats: { amount: 0, unit: NutritionUnit.g },
    sugar: { amount: 0, unit: NutritionUnit.g },
    vitamins: [] as IVitaminInfo[]
  }

  // Aggregate nutrition from all food items and their ingredients
  for (const foodItem of foodItems) {
    for (const ingredient of foodItem.ingredients) {
      // Convert all amounts to base units and sum them
      totals.calories.amount += convertToBaseUnit(
        ingredient.calories,
        NutritionUnit.kcal
      )
      totals.proteins.amount += convertToBaseUnit(
        ingredient.proteins,
        NutritionUnit.g
      )
      totals.carbohydrates.amount += convertToBaseUnit(
        ingredient.carbohydrates,
        NutritionUnit.g
      )
      totals.fats.amount += convertToBaseUnit(ingredient.fats, NutritionUnit.g)
      totals.sugar.amount += convertToBaseUnit(
        ingredient.sugar,
        NutritionUnit.g
      )

      // Handle vitamins (this is simplified - in reality you'd want more sophisticated aggregation)
      totals.vitamins.push(
        { name: 'Vitamin C', value: ingredient.vitaminC },
        { name: 'Vitamin B6', value: ingredient.vitaminB6 },
        { name: 'Vitamin B12', value: ingredient.vitaminB12 }
      )
    }
  }

  return totals
}

/**
 * Convert nutrition value to base unit for calculations
 */
function convertToBaseUnit(
  nutrition: INutritionValue,
  targetUnit: NutritionUnit
): number {
  // This is a simplified conversion - you'd want a more comprehensive unit conversion system
  const { amount, unit } = nutrition

  if (unit === targetUnit) {
    return amount
  }

  // Basic conversions (extend as needed)
  if (targetUnit === NutritionUnit.g) {
    switch (unit) {
      case NutritionUnit.kg:
        return amount * 1000
      case NutritionUnit.mg:
        return amount / 1000
      case NutritionUnit.mcg:
        return amount / 1000000
      default:
        return amount
    }
  }

  if (targetUnit === NutritionUnit.kcal) {
    switch (unit) {
      case NutritionUnit.kJ:
        return amount / 4.184
      default:
        return amount
    }
  }

  return amount
}

