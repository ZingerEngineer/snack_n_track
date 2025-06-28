import { z } from 'zod'
import { PortionUnit } from '@prisma/client'
import {
  IngredientsForFoodItemSchema,
  IngredientNamesSchema
} from '../ingredient/ingredient.zod'

// Enum schema for PortionUnit
export const PortionUnitSchema = z.nativeEnum(PortionUnit)

// Schema for creating food items with ingredient IDs (proper Prisma relation)
export const CreateFoodItemSchema = z.object({
  foodName: z
    .string()
    .min(1, 'Food name is required')
    .max(200, 'Food name is too long'),
  portionUnit: PortionUnitSchema.default(PortionUnit.SERVING),
  portionSizeValue: z
    .number()
    .min(0.01, 'Portion size must be greater than 0')
    .max(10000, 'Portion size is too large'),
  ingredientString: z
    .string()
    .min(1, 'Ingredient string is required')
    .max(1000, 'Ingredient string is too long'),
  ingredients: z.object({
    connect: IngredientsForFoodItemSchema
  })
})

// Schema for creating food items with ingredient names (for convenience)
export const CreateFoodItemWithNamesSchema = z.object({
  foodName: z
    .string()
    .min(1, 'Food name is required')
    .max(200, 'Food name is too long'),
  portionUnit: PortionUnitSchema.default(PortionUnit.SERVING),
  portionSizeValue: z
    .number()
    .min(0.01, 'Portion size must be greater than 0')
    .max(10000, 'Portion size is too large'),
  ingredientString: z
    .string()
    .min(1, 'Ingredient string is required')
    .max(1000, 'Ingredient string is too long'),
  ingredients: IngredientNamesSchema
})

// Schema for updating food items
export const UpdateFoodItemSchema = z.object({
  id: z.string().uuid(),
  foodName: z
    .string()
    .min(1, 'Food name is required')
    .max(200, 'Food name is too long')
    .optional(),
  portionUnit: PortionUnitSchema.optional(),
  portionSizeValue: z
    .number()
    .min(0.01, 'Portion size must be greater than 0')
    .max(10000, 'Portion size is too large')
    .optional(),
  ingredientString: z
    .string()
    .min(1, 'Ingredient string is required')
    .max(1000, 'Ingredient string is too long')
    .optional(),
  ingredients: z
    .object({
      connect: IngredientsForFoodItemSchema
    })
    .optional()
})

// Schema for food item search/filter
export const FoodItemSearchSchema = z.object({
  name: z.string().optional(),
  ingredientName: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(10),
  offset: z.number().int().min(0).default(0),
  includeIngredients: z.boolean().default(false),
  includeMealFoodItems: z.boolean().default(false)
})

// Type inference for TypeScript
export type TCreateFoodItemSchema = z.infer<typeof CreateFoodItemSchema>
export type TCreateFoodItemWithNamesSchema = z.infer<
  typeof CreateFoodItemWithNamesSchema
>
export type TUpdateFoodItemSchema = z.infer<typeof UpdateFoodItemSchema>
export type TFoodItemSearchSchema = z.infer<typeof FoodItemSearchSchema>

