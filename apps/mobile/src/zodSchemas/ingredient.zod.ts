import z from 'zod'
import { NutritionUnitSchema } from './shared.zod'
import { NutritionUnit } from '../types/shared.types'

export const ingredientSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  ingredientName: z.string().default('New ingredient'),
  calories: z.number().default(0),
  caloriesUnit: NutritionUnitSchema.default(NutritionUnit.kcal),

  carbohydratesAmount: z.number(),
  carbohydratesUnit: NutritionUnitSchema.default(NutritionUnit.g),

  proteinsAmount: z.number(),
  proteinsUnit: NutritionUnitSchema.default(NutritionUnit.g),

  fatsAmount: z.number(),
  fatsUnit: NutritionUnitSchema.default(NutritionUnit.g),

  sugarAmount: z.number(),
  sugarUnit: NutritionUnitSchema.default(NutritionUnit.g),

  ironAmount: z.number(),
  ironUnit: NutritionUnitSchema.default(NutritionUnit.mg),

  sodiumAmount: z.number(),
  sodiumUnit: NutritionUnitSchema.default(NutritionUnit.mg),

  potassiumAmount: z.number(),
  potassiumUnit: NutritionUnitSchema.default(NutritionUnit.mg),

  vitaminC: z.number(),
  vitaminCUnit: NutritionUnitSchema.default(NutritionUnit.mg),

  vitaminB6: z.number(),
  vitaminB6Unit: NutritionUnitSchema.default(NutritionUnit.mg),

  vitaminB12: z.number(),
  vitaminB12Unit: NutritionUnitSchema.default(NutritionUnit.mcg),
})

export const savedIngredientSchema = z.object({
  id: z.string(),
  foodItemId: z.string(),
  ingredientName: z.string(),
  calories: z.number(),
  caloriesUnit: NutritionUnitSchema,

  carbohydratesAmount: z.number(),
  carbohydratesUnit: NutritionUnitSchema,

  proteinsAmount: z.number(),
  proteinsUnit: NutritionUnitSchema,

  fatsAmount: z.number(),
  fatsUnit: NutritionUnitSchema,

  sugarAmount: z.number(),
  sugarUnit: NutritionUnitSchema,

  ironAmount: z.number(),
  ironUnit: NutritionUnitSchema,

  sodiumAmount: z.number(),
  sodiumUnit: NutritionUnitSchema,

  potassiumAmount: z.number(),
  potassiumUnit: NutritionUnitSchema,

  vitaminC: z.number(),
  vitaminCUnit: NutritionUnitSchema,

  vitaminB6: z.number(),
  vitaminB6Unit: NutritionUnitSchema,

  vitaminB12: z.number(),
  vitaminB12Unit: NutritionUnitSchema,
})
