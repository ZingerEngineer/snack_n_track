import { NutritionUnit } from './shared.types'

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
}
