import type { TFoodItem } from './food.types'
export type TMealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'OTHER'

export type TMeal = {
  id: string
  userId: string
  name: string
  totalCalories: number
  mealType: TMealType
  certaintyPercentage?: number
  foodItems?: TFoodItem[]
}

export type TSavedMeal = {
  id: string
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
  certaintyPercentage: number
  totalCalories: number
  mealType: TMealType
  foodItems: TFoodItem[]
}
