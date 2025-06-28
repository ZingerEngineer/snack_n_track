import { NutritionUnit, FoodIngredient } from '@prisma/client'

export type TIngredient = {
  id: string
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

  FoodIngredient?: FoodIngredient[]
}

// Type for creating food items - represents ingredients for the connect operation
export type TIngredientForFoodItem = {
  id: string
}

// Type for creating new ingredients
export type TCreateIngredient = Omit<TIngredient, 'id' | 'FoodIngredient'>

// Type for ingredient with all nutrition data (used in responses)
export type TIngredientWithNutrition = TIngredient
