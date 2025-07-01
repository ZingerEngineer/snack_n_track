import { PortionUnit } from '@prisma/client'

// Enums for new properties
export enum MealAuthor {
  ChatGPT = 'ChatGPT',
  Gemini = 'Gemini',
  SnackModel = 'SnackModel'
}

export enum TypeOfMeal {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snack = 'Snack',
  Brunch = 'Brunch',
  Dessert = 'Dessert',
  Other = 'Other'
}

// Core meal types based on Prisma schema
export interface TMeal {
  id: string
  name: string
  userId?: string | null
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
  totalCalories: number
  author: MealAuthor
  typeOfMeal: TypeOfMeal
}

export interface TMealWithUser extends TMeal {
  user?: {
    id: string
    name?: string | null
    email: string
  } | null
}

export interface TMealWithFoodItems extends TMeal {
  foodItems: TMealFoodItem[]
}

export interface TMealFoodItem {
  mealId: string
  foodId: string
  foodItem: TFoodItemBasic
}

export interface TFoodItemBasic {
  id: string
  foodName: string
  portionUnit: PortionUnit
  portionSizeValue: number
  ingredientString: string
}

export interface TFoodItemWithIngredients extends TFoodItemBasic {
  ingredients: TFoodIngredient[]
}

export interface TFoodIngredient {
  foodId: string
  ingredientId: string
  ingredient: TIngredientBasic
}

export interface TIngredientBasic {
  id: string
  ingredientName: string
  calories: number
  carbohydratesAmount: number
  proteinsAmount: number
  fatsAmount: number
}

// Full meal with all relations
export interface TMealFull extends TMeal {
  user?: {
    id: string
    name?: string | null
    email: string
  } | null
  foodItems: Array<{
    mealId: string
    foodId: string
    foodItem: TFoodItemWithIngredients
  }>
}

// Create meal types
export interface TCreateMeal {
  name: string
  userId?: string
  totalCalories: number
  author: MealAuthor
  typeOfMeal: TypeOfMeal
  foodItemIds?: string[]
}

export interface TCreateMealWithFoodItems
  extends Omit<TCreateMeal, 'foodItemIds'> {
  foodItems: Array<{
    foodId: string
  }>
}

// Update meal types
export interface TUpdateMeal {
  id: string
  name?: string
  totalCalories?: number
  author?: MealAuthor
  typeOfMeal?: TypeOfMeal
  foodItemIds?: string[]
}

// Meal search/filter types
export interface TMealSearchParams {
  name?: string
  userId?: string
  author?: MealAuthor
  typeOfMeal?: TypeOfMeal
  startDate?: Date
  endDate?: Date
  minCalories?: number
  maxCalories?: number
  limit?: number
  offset?: number
  includeFoodItems?: boolean
  includeUser?: boolean
  includeDeleted?: boolean
}

// Import shared nutrition types from mobile app
// Note: In a real monorepo setup, these should be in a shared package
// For now, we'll define server-specific nutrition types that match the mobile shared types
export type TTypeOfFood =
  | 'Vegetable'
  | 'Fruit'
  | 'Grain'
  | 'Dessert'
  | 'Beverage'
  | 'Meal'

export interface INutritionData {
  id: string
  certainty_percentage: number
  isSure: boolean
  name: string
  keywords?: Array<string> // Optional for mobile compatibility
  type_of_food: TTypeOfFood
  proteins: string
  carbs: string
  fats: string
  vitamins: Array<{
    vitamin_name: string
    vitamin_portion: string
  }>
}

export interface IEstimatedNutritionData {
  id: string
  certainty_percentage: number
  isSure: boolean
  estimated_name: string
  estimated_typeOfFood: TTypeOfFood
}

