import { FoodType, PortionUnit } from '../types/shared.types'
import { z } from 'zod'
import { ingredientSchema, savedIngredientSchema } from './ingredient.zod'

export const foodItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  foodName: z.string().default('New food item'),
  foodType: z.nativeEnum(FoodType).default(FoodType.MEAL),
  portionUnit: z.nativeEnum(PortionUnit).default(PortionUnit.SERVING),
  portionSizeValue: z.number().default(1),
  ingredientString: z.string().optional().default(''),
  ingredients: ingredientSchema.array().default([]),
})

export const savedFoodItem = z.object({
  id: z.string(),
  userId: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  foodName: z.string(),
  foodType: z.nativeEnum(FoodType),
  PortionUnit: z.nativeEnum(PortionUnit),
  portionSizeValue: z.number(),
  ingredientString: z.string(),
  ingredients: savedIngredientSchema,
})
