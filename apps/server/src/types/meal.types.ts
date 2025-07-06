import type { TScanFoodItem } from './foodItems.types'
import { MealType } from './shared.types'

export type TScanMeal = {
  name: string
  userId: string
  certaintyPercentage: number
  totalCalories: number
  mealType: MealType
  foodItems: TScanFoodItem[]
}

export type THybridResponse = TScanMeal[]

