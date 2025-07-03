import { MealType } from '../types/shared.types'
import z from 'zod'
import { foodItemSchema } from './foodItems.zod'

export const mealSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  name: z.string().default('New meal'),
  totalCalories: z.number().default(0),
  mealType: z.nativeEnum(MealType).default(MealType.OTHER),
  certaintyPercentage: z.number().default(0).optional(),
  foodItems: foodItemSchema.array().default([]),
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
