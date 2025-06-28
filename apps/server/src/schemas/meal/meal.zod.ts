import { z } from 'zod'
import { MealAuthor, TypeOfMeal } from '../../types/meal/meal.types'

// Enum schemas
export const MealAuthorSchema = z.nativeEnum(MealAuthor)
export const TypeOfMealSchema = z.nativeEnum(TypeOfMeal)

// Basic meal schema matching Prisma model
export const MealSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(1, 'Meal name is required')
    .max(200, 'Meal name is too long')
    .default('New Meal'),
  userId: z.string().uuid().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
  totalCalories: z
    .number()
    .min(0, 'Total calories must be non-negative')
    .max(10000, 'Total calories seems unrealistic'),
  author: MealAuthorSchema,
  typeOfMeal: TypeOfMealSchema
})

// Schema for creating meals
export const CreateMealSchema = z.object({
  name: z
    .string()
    .min(1, 'Meal name is required')
    .max(200, 'Meal name is too long')
    .default('New Meal'),
  userId: z.string().uuid('Invalid user ID format').optional(),
  totalCalories: z
    .number()
    .min(0, 'Total calories must be non-negative')
    .max(10000, 'Total calories seems unrealistic'),
  author: MealAuthorSchema.default(MealAuthor.SnackModel),
  typeOfMeal: TypeOfMealSchema.default(TypeOfMeal.Other),
  foodItemIds: z
    .array(z.string().uuid('Invalid food item ID format'))
    .optional()
    .default([])
})

// Schema for creating meals with food items array
export const CreateMealWithFoodItemsSchema = z.object({
  name: z
    .string()
    .min(1, 'Meal name is required')
    .max(200, 'Meal name is too long')
    .default('New Meal'),
  userId: z.string().uuid('Invalid user ID format').optional(),
  totalCalories: z
    .number()
    .min(0, 'Total calories must be non-negative')
    .max(10000, 'Total calories seems unrealistic'),
  author: MealAuthorSchema.default(MealAuthor.SnackModel),
  typeOfMeal: TypeOfMealSchema.default(TypeOfMeal.Other),
  foodItems: z
    .array(
      z.object({
        foodId: z.string().uuid('Invalid food item ID format')
      })
    )
    .min(1, 'At least one food item is required')
    .max(50, 'Too many food items for one meal')
})

// Schema for updating meals
export const UpdateMealSchema = z.object({
  id: z.string().uuid('Invalid meal ID format'),
  name: z
    .string()
    .min(1, 'Meal name is required')
    .max(200, 'Meal name is too long')
    .optional(),
  totalCalories: z
    .number()
    .min(0, 'Total calories must be non-negative')
    .max(10000, 'Total calories seems unrealistic')
    .optional(),
  author: MealAuthorSchema.optional(),
  typeOfMeal: TypeOfMealSchema.optional(),
  foodItemIds: z
    .array(z.string().uuid('Invalid food item ID format'))
    .max(50, 'Too many food items for one meal')
    .optional()
})

// Schema for meal search parameters
export const MealSearchSchema = z
  .object({
    name: z.string().optional(),
    userId: z.string().uuid('Invalid user ID format').optional(),
    author: MealAuthorSchema.optional(),
    typeOfMeal: TypeOfMealSchema.optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    minCalories: z.number().min(0).optional(),
    maxCalories: z.number().min(0).optional(),
    limit: z.number().int().min(1).max(100).default(10),
    offset: z.number().int().min(0).default(0),
    includeFoodItems: z.boolean().default(false),
    includeUser: z.boolean().default(false),
    includeDeleted: z.boolean().default(false)
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate
      }
      return true
    },
    {
      message: 'Start date must be before or equal to end date',
      path: ['startDate']
    }
  )
  .refine(
    (data) => {
      if (data.minCalories && data.maxCalories) {
        return data.minCalories <= data.maxCalories
      }
      return true
    },
    {
      message:
        'Minimum calories must be less than or equal to maximum calories',
      path: ['minCalories']
    }
  )

// Schema for adding food items to a meal
export const AddFoodItemsToMealSchema = z.object({
  mealId: z.string().uuid('Invalid meal ID format'),
  foodItemIds: z
    .array(z.string().uuid('Invalid food item ID format'))
    .min(1, 'At least one food item ID is required')
    .max(50, 'Too many food items to add at once')
})

// Schema for removing food items from a meal
export const RemoveFoodItemsFromMealSchema = z.object({
  mealId: z.string().uuid('Invalid meal ID format'),
  foodItemIds: z
    .array(z.string().uuid('Invalid food item ID format'))
    .min(1, 'At least one food item ID is required')
})

// Schema for meal food item relation
export const MealFoodItemSchema = z.object({
  mealId: z.string().uuid('Invalid meal ID format'),
  foodId: z.string().uuid('Invalid food item ID format')
})

// Schema for calculating meal calories
export const CalculateMealCaloriesSchema = z.object({
  foodItemIds: z
    .array(z.string().uuid('Invalid food item ID format'))
    .min(1, 'At least one food item is required for calculation')
})

// Schema for meal statistics/analytics
export const MealStatsSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  groupBy: z.enum(['day', 'week', 'month']).default('day')
})

// Type inference for TypeScript
export type TMealSchema = z.infer<typeof MealSchema>
export type TCreateMealSchema = z.infer<typeof CreateMealSchema>
export type TCreateMealWithFoodItemsSchema = z.infer<
  typeof CreateMealWithFoodItemsSchema
>
export type TUpdateMealSchema = z.infer<typeof UpdateMealSchema>
export type TMealSearchSchema = z.infer<typeof MealSearchSchema>
export type TAddFoodItemsToMealSchema = z.infer<typeof AddFoodItemsToMealSchema>
export type TRemoveFoodItemsFromMealSchema = z.infer<
  typeof RemoveFoodItemsFromMealSchema
>
export type TMealFoodItemSchema = z.infer<typeof MealFoodItemSchema>
export type TCalculateMealCaloriesSchema = z.infer<
  typeof CalculateMealCaloriesSchema
>
export type TMealStatsSchema = z.infer<typeof MealStatsSchema>
