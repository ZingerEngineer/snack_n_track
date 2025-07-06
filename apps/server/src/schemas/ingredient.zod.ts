import { z } from 'zod'
import { NutritionUnit } from '../types/shared.types'
import { v4 as uuid } from 'uuid'
import { parseStringNumber } from './utils/parseStringNumber'
// Enum schema for NutritionUnit
export const NutritionUnitSchema = z.nativeEnum(NutritionUnit)

// Base ingredient schema matching the Prisma model
export const scanIngredientSchema = z.object({
  id: z
    .string()
    .uuid()
    .catch(() => uuid()), // Default to a new UUID
  ingredientName: z
    .string()
    .min(1, 'Ingredient name is required')
    .catch('New Ingredient'),

  calories: z
    .number()
    .min(0, 'Calories must be non-negative')
    .catch((calories: unknown) => parseStringNumber(calories)),
  caloriesUnit: NutritionUnitSchema.default(NutritionUnit.kcal),

  carbohydratesAmount: z
    .number()
    .min(0, 'Carbohydrates amount must be non-negative')
    .catch((carbohydratesAmount: unknown) =>
      parseStringNumber(carbohydratesAmount)
    ),
  carbohydratesUnit: NutritionUnitSchema.catch(NutritionUnit.g),

  proteinsAmount: z
    .number()
    .min(0, 'Proteins amount must be non-negative')
    .catch((proteinsAmount: unknown) => parseStringNumber(proteinsAmount)),
  proteinsUnit: NutritionUnitSchema.catch(NutritionUnit.g),

  fatsAmount: z
    .number()
    .min(0, 'Fats amount must be non-negative')
    .catch((fatsAmount: unknown) => parseStringNumber(fatsAmount)),
  fatsUnit: NutritionUnitSchema.catch(NutritionUnit.g),

  sugarAmount: z
    .number()
    .min(0, 'Sugar amount must be non-negative')
    .catch((sugarAmount: unknown) => parseStringNumber(sugarAmount)),
  sugarUnit: NutritionUnitSchema.catch(NutritionUnit.g),

  ironAmount: z
    .number()
    .min(0, 'Iron amount must be non-negative')
    .catch((ironAmount: unknown) => parseStringNumber(ironAmount)),
  ironUnit: NutritionUnitSchema.catch(NutritionUnit.mg),

  sodiumAmount: z
    .number()
    .min(0, 'Sodium amount must be non-negative')
    .catch((sodiumAmount: unknown) => parseStringNumber(sodiumAmount)),
  sodiumUnit: NutritionUnitSchema.catch(NutritionUnit.mg),

  potassiumAmount: z
    .number()
    .min(0, 'Potassium amount must be non-negative')
    .catch((potassiumAmount: unknown) => parseStringNumber(potassiumAmount)),
  potassiumUnit: NutritionUnitSchema.catch(NutritionUnit.mg),

  vitaminC: z
    .number()
    .min(0, 'Vitamin C must be non-negative')
    .catch((vitaminC: unknown) => parseStringNumber(vitaminC)),
  vitaminCUnit: NutritionUnitSchema.catch(NutritionUnit.mg),

  vitaminB6: z
    .number()
    .min(0, 'Vitamin B6 must be non-negative')
    .catch((vitaminB6: unknown) => parseStringNumber(vitaminB6)),
  vitaminB6Unit: NutritionUnitSchema.catch(NutritionUnit.mg),

  vitaminB12: z
    .number()
    .min(0, 'Vitamin B12 must be non-negative')
    .catch((vitaminB12: unknown) => parseStringNumber(vitaminB12)),
  vitaminB12Unit: NutritionUnitSchema.catch(NutritionUnit.mcg)
})

