import { z } from 'zod'
import { PortionUnit } from '../types/shared.types'
import { scanIngredientSchema } from './ingredient.zod'
import { v4 as uuidv4 } from 'uuid'
import { parseStringNumber } from './utils/parseStringNumber'
// Enum schema for PortionUnit
export const PortionUnitSchema = z.nativeEnum(PortionUnit)

export const ScanFoodItemSchema = z.object({
  id: z
    .string()
    .uuid()
    .catch(() => uuidv4()),
  foodName: z.string().min(1, 'Food name is required').catch('New Food Item'),
  portionUnit: PortionUnitSchema.catch(PortionUnit.SERVING),
  portionSizeValue: z
    .number()
    .min(0, 'Portion size must be non-negative')
    .catch(
      (portionSizeValue: unknown) => parseStringNumber(portionSizeValue) || 1
    ),
  ingredientString: z.string().catch(''),
  ingredients: scanIngredientSchema.array().catch([])
})

