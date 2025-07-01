// Meal-related types
// This file contains types specifically for meal management and meal operations

export type TMealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'OTHER'

export interface IMeal {
  id: string
  name: string
  userId?: string | null
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
  totalCalories: number
  author: string
  mealType: TMealType
}
