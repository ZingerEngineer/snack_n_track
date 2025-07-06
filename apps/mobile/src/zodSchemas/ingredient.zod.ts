import z from 'zod'
import { NutritionUnitSchema } from './shared.zod'
import { NutritionUnit } from '../types/shared.types'
import { parseStringNumber } from './utils/parseStringNumber'

export const ingredientSchema = z.object({
  id: z.string().catch(() => crypto.randomUUID()),
  ingredientName: z.string().catch('New ingredient'),
  calories: z.number().catch((calories) => parseStringNumber(calories)),
  caloriesUnit: NutritionUnitSchema.catch(NutritionUnit.kcal),

  carbohydratesAmount: z
    .number()
    .catch((carbohydratesAmount) => parseStringNumber(carbohydratesAmount)),
  carbohydratesUnit: NutritionUnitSchema.catch(NutritionUnit.g),

  proteinsAmount: z.number().catch((proteinsAmount) => parseStringNumber(proteinsAmount)),
  proteinsUnit: NutritionUnitSchema.catch(NutritionUnit.g),

  fatsAmount: z.number().catch((fatsAmount) => parseStringNumber(fatsAmount)),
  fatsUnit: NutritionUnitSchema.catch(NutritionUnit.g),

  sugarAmount: z.number().catch((sugarAmount) => parseStringNumber(sugarAmount)),
  sugarUnit: NutritionUnitSchema.catch(NutritionUnit.g),

  ironAmount: z.number().catch((ironAmount) => parseStringNumber(ironAmount)),
  ironUnit: NutritionUnitSchema.catch(NutritionUnit.mg),

  sodiumAmount: z.number().catch((sodiumAmount) => parseStringNumber(sodiumAmount)),
  sodiumUnit: NutritionUnitSchema.catch(NutritionUnit.mg),

  potassiumAmount: z.number().catch((potassiumAmount) => parseStringNumber(potassiumAmount)),
  potassiumUnit: NutritionUnitSchema.catch(NutritionUnit.mg),

  vitaminC: z.number().catch((vitaminC) => parseStringNumber(vitaminC)),
  vitaminCUnit: NutritionUnitSchema.catch(NutritionUnit.mg),

  vitaminB6: z.number().catch((vitaminB6) => parseStringNumber(vitaminB6)),
  vitaminB6Unit: NutritionUnitSchema.catch(NutritionUnit.mg),

  vitaminB12: z.number().catch((vitaminB12) => parseStringNumber(vitaminB12)),
  vitaminB12Unit: NutritionUnitSchema.catch(NutritionUnit.mcg),
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
