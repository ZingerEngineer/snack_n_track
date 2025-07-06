import { MealType } from '../types/shared.types'
import z from 'zod'
import { foodItemSchema } from './foodItems.zod'
import { parseStringNumber } from './utils/parseStringNumber'

export const mealSchema = z.object({
  id: z.string().catch(() => crypto.randomUUID()),
  name: z.string().catch('New meal'),
  totalCalories: z.number().catch((totalCalories) => parseStringNumber(totalCalories)),
  mealType: z.nativeEnum(MealType).catch(MealType.OTHER),
  certaintyPercentage: z
    .number()
    .catch((certaintyPercentage) => parseStringNumber(certaintyPercentage)),
  foodItems: foodItemSchema.array().catch([]),
})

export const savedMealSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  certaintyPercentage: z.number().optional(),
  totalCalories: z.number(),
  mealType: z.nativeEnum(MealType),
  foodItems: foodItemSchema.array(),
})
