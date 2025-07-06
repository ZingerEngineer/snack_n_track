import { z } from 'zod'
import { MealAuthor, MealType } from '../types/shared.types'
import { ScanFoodItemSchema } from './foodItem.zod'
import { v4 as uuid } from 'uuid'
import { parseStringNumber } from './utils/parseStringNumber'
// Enum schemas
export const MealAuthorSchema = z.nativeEnum(MealAuthor)
export const TypeOfMealSchema = z.nativeEnum(MealType)

// Basic meal schema matching Prisma model
export const ScanMealSchema = z.object({
  id: z
    .string()
    .uuid()
    .catch(() => uuid()), // Default to a new UUID
  name: z
    .string()
    .min(1, 'Meal name is required')
    .max(200, 'Meal name is too long')
    .catch('New Meal'),
  userId: z.string().uuid(),
  totalCalories: z
    .number()
    .min(0, 'Total calories must be non-negative')
    .max(10000, 'Total calories seems unrealistic')
    .catch((totalCalories) => parseStringNumber(totalCalories)), // Default to 0 if not provided

  author: MealAuthorSchema.catch(MealAuthor.GEMINI),
  typeOfMeal: TypeOfMealSchema.catch(MealType.OTHER),
  foodItems: ScanFoodItemSchema.array()
    .min(1, 'At least one food item is required')
    .max(100, 'Too many food items')
    .catch([])
})

export type validatedMealScan = z.infer<typeof ScanMealSchema>

