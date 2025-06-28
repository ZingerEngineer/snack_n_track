import { z } from 'zod'
import { NutritionUnit } from '@prisma/client'

// Enum schema for NutritionUnit
export const NutritionUnitSchema = z.nativeEnum(NutritionUnit)

// Base ingredient schema matching the Prisma model
export const IngredientSchema = z.object({
  id: z.string().uuid(),
  ingredientName: z.string().min(1, 'Ingredient name is required'),

  calories: z.number().min(0, 'Calories must be non-negative').default(0),
  caloriesUnit: NutritionUnitSchema.default(NutritionUnit.kcal),

  carbohydratesAmount: z
    .number()
    .min(0, 'Carbohydrates amount must be non-negative')
    .default(0),
  carbohydratesUnit: NutritionUnitSchema.default(NutritionUnit.g),

  proteinsAmount: z
    .number()
    .min(0, 'Proteins amount must be non-negative')
    .default(0),
  proteinsUnit: NutritionUnitSchema.default(NutritionUnit.g),

  fatsAmount: z.number().min(0, 'Fats amount must be non-negative').default(0),
  fatsUnit: NutritionUnitSchema.default(NutritionUnit.g),

  sugarAmount: z
    .number()
    .min(0, 'Sugar amount must be non-negative')
    .default(0),
  sugarUnit: NutritionUnitSchema.default(NutritionUnit.g),

  ironAmount: z.number().min(0, 'Iron amount must be non-negative').default(0),
  ironUnit: NutritionUnitSchema.default(NutritionUnit.mg),

  sodiumAmount: z
    .number()
    .min(0, 'Sodium amount must be non-negative')
    .default(0),
  sodiumUnit: NutritionUnitSchema.default(NutritionUnit.mg),

  potassiumAmount: z
    .number()
    .min(0, 'Potassium amount must be non-negative')
    .default(0),
  potassiumUnit: NutritionUnitSchema.default(NutritionUnit.mg),

  vitaminC: z.number().min(0, 'Vitamin C must be non-negative').default(0),
  vitaminCUnit: NutritionUnitSchema.default(NutritionUnit.mg),

  vitaminB6: z.number().min(0, 'Vitamin B6 must be non-negative').default(0),
  vitaminB6Unit: NutritionUnitSchema.default(NutritionUnit.mg),

  vitaminB12: z.number().min(0, 'Vitamin B12 must be non-negative').default(0),
  vitaminB12Unit: NutritionUnitSchema.default(NutritionUnit.mcg)
})

// Schema for creating new ingredients (without id)
export const CreateIngredientSchema = IngredientSchema.omit({ id: true })

// Schema for updating ingredients (all fields optional except id)
export const UpdateIngredientSchema = IngredientSchema.partial().required({
  id: true
})

// Schema for ingredient reference (just id) - used for connecting ingredients to food items
export const IngredientReferenceSchema = z.object({
  id: z.string().uuid('Invalid ingredient ID format')
})

// Schema for an array of ingredient references - this is what you need for food item creation
export const IngredientsForFoodItemSchema = z
  .array(IngredientReferenceSchema)
  .min(1, 'At least one ingredient is required')
  .max(50, 'Too many ingredients (maximum 50)')

// Schema for ingredient names array (for searching/creating ingredients by name)
export const IngredientNamesSchema = z
  .array(z.string().min(1, 'Ingredient name cannot be empty'))
  .min(1, 'At least one ingredient name is required')
  .max(50, 'Too many ingredient names (maximum 50)')

// Schema for ingredient search/filter
export const IngredientSearchSchema = z.object({
  name: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(10),
  offset: z.number().int().min(0).default(0)
})

// Type inference for TypeScript
export type TIngredientSchema = z.infer<typeof IngredientSchema>
export type TCreateIngredientSchema = z.infer<typeof CreateIngredientSchema>
export type TUpdateIngredientSchema = z.infer<typeof UpdateIngredientSchema>
export type TIngredientReferenceSchema = z.infer<
  typeof IngredientReferenceSchema
>
export type TIngredientsForFoodItemSchema = z.infer<
  typeof IngredientsForFoodItemSchema
>
export type TIngredientNamesSchema = z.infer<typeof IngredientNamesSchema>
export type TIngredientSearchSchema = z.infer<typeof IngredientSearchSchema>

