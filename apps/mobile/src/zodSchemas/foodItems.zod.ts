import { FoodType, PortionUnit } from '../types/shared.types'
import { z } from 'zod'
import { ingredientSchema, savedIngredientSchema } from './ingredient.zod'
import { parseStringNumber } from './utils/parseStringNumber'

export const foodItemSchema = z.object({
  id: z.string().catch(() => crypto.randomUUID()),
  foodName: z.string().catch('New food item'),
  foodType: z.nativeEnum(FoodType).catch(FoodType.MEAL),
  portionUnit: z.nativeEnum(PortionUnit).catch(PortionUnit.SERVING),
  portionSizeValue: z.number().catch((portionSizeValue) => parseStringNumber(portionSizeValue)),
  ingredientString: z.string().optional().catch(''),
  ingredients: ingredientSchema.array().catch([]),
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
