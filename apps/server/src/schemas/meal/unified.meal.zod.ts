/**
 * Updated Zod schemas for meal scanning that align with Prisma schema and new types
 * These schemas provide runtime validation for the unified meal response structure
 */

import { z } from 'zod'
import { MealType, FoodType, NutritionUnit, PortionUnit } from '@prisma/client'

// Enum schemas based on Prisma enums
export const MealTypeSchema = z.nativeEnum(MealType)
export const FoodTypeSchema = z.nativeEnum(FoodType)
export const NutritionUnitSchema = z.nativeEnum(NutritionUnit)
export const PortionUnitSchema = z.nativeEnum(PortionUnit)

/**
 * Nutrition value schema with amount and unit
 */
export const NutritionValueSchema = z.object({
  amount: z.number().min(0, 'Nutrition amount must be non-negative'),
  unit: NutritionUnitSchema
})

/**
 * Vitamin information schema
 */
export const VitaminInfoSchema = z.object({
  name: z.string().min(1, 'Vitamin name is required'),
  value: NutritionValueSchema
})

/**
 * Ingredient data schema matching Prisma model
 */
export const IngredientDataSchema = z.object({
  id: z.string().uuid('Invalid ingredient ID'),
  ingredientName: z.string().min(1, 'Ingredient name is required'),

  calories: NutritionValueSchema,
  carbohydrates: NutritionValueSchema,
  proteins: NutritionValueSchema,
  fats: NutritionValueSchema,
  sugar: NutritionValueSchema,
  iron: NutritionValueSchema,
  sodium: NutritionValueSchema,
  potassium: NutritionValueSchema,
  vitaminC: NutritionValueSchema,
  vitaminB6: NutritionValueSchema,
  vitaminB12: NutritionValueSchema
})

/**
 * Food item data schema matching Prisma model
 */
export const FoodItemDataSchema = z.object({
  id: z.string().uuid('Invalid food item ID'),
  foodName: z.string().min(1, 'Food name is required'),
  foodType: FoodTypeSchema,
  portionUnit: PortionUnitSchema,
  portionSizeValue: z.number().positive('Portion size must be positive'),
  ingredientString: z.string(),
  ingredients: z.array(IngredientDataSchema)
})

/**
 * Total nutrition schema for aggregated meal nutrition
 */
export const TotalNutritionSchema = z.object({
  calories: NutritionValueSchema,
  proteins: NutritionValueSchema,
  carbohydrates: NutritionValueSchema,
  fats: NutritionValueSchema,
  sugar: NutritionValueSchema,
  vitamins: z.array(VitaminInfoSchema)
})

/**
 * Complete meal scan response schema
 */
export const MealScanResponseSchema = z.object({
  // Core identification
  certaintyPercentage: z.number().min(0).max(100),
  mealName: z.string().min(1, 'Meal name is required'),
  mealType: MealTypeSchema,

  // Food items array
  foodItems: z
    .array(FoodItemDataSchema)
    .min(1, 'At least one food item is required'),

  // Aggregated nutrition
  totalNutrition: TotalNutritionSchema,

  // Additional metadata
  ingredientsFound: z.array(z.string()),
  keywords: z.array(z.string()).optional(),

  // Processing metadata
  source: z.enum(['snackntrack', 'gemini', 'hybrid']).optional(),
  processingTime: z.number().positive().optional(),

  // Database reference
  mealId: z.string().uuid().optional()
})

/**
 * Meal scan request schema
 */
export const MealScanRequestSchema = z.object({
  userId: z.string().uuid('Invalid user ID').optional(),
  mealName: z.string().min(1).max(200).optional().default('Scanned Meal'),
  mealType: MealTypeSchema.optional().default(MealType.OTHER),
  saveToHistory: z.boolean().optional().default(true)
})

/**
 * File upload schema for meal images
 */
export const FileUploadSchema = z.object({
  originalname: z.string().min(1, 'File name is required'),
  mimetype: z.enum(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'], {
    message: 'Only JPEG, PNG, and WebP images are allowed'
  }),
  size: z
    .number()
    .max(50 * 1024 * 1024, 'File size must be less than 50MB')
    .min(1, 'File cannot be empty'),
  filename: z.string().min(1, 'Generated filename is required'),
  path: z.string().min(1, 'File path is required')
})

/**
 * Success response wrapper schema
 */
export const MealScanSuccessResponseSchema = z.object({
  status: z.literal('success'),
  data: MealScanResponseSchema
})

/**
 * Error response schema
 */
export const MealScanErrorResponseSchema = z.object({
  status: z.literal('error'),
  message: z.string().min(1, 'Error message is required'),
  code: z.string().optional(),
  details: z.any().optional()
})

/**
 * Union schema for API responses
 */
export const MealScanApiResponseSchema = z.union([
  MealScanSuccessResponseSchema,
  MealScanErrorResponseSchema
])

/**
 * Database meal creation schema
 */
export const MealCreationDataSchema = z.object({
  name: z.string().min(1, 'Meal name is required'),
  userId: z.string().uuid().optional(),
  mealType: MealTypeSchema,
  totalCalories: z.number().min(0),
  certaintyPercentage: z.number().min(0).max(100),
  author: z.string().min(1, 'Author is required'),
  source: z.string().optional()
})

/**
 * Food item creation schema for database
 */
export const FoodItemCreationDataSchema = z.object({
  foodName: z.string().min(1, 'Food name is required'),
  foodType: FoodTypeSchema,
  portionUnit: PortionUnitSchema,
  portionSizeValue: z.number().positive(),
  ingredientString: z.string()
})

/**
 * Ingredient creation schema for database
 */
export const IngredientCreationDataSchema = z.object({
  ingredientName: z.string().min(1, 'Ingredient name is required'),

  calories: z.number().min(0),
  caloriesUnit: NutritionUnitSchema,

  carbohydratesAmount: z.number().min(0),
  carbohydratesUnit: NutritionUnitSchema,

  proteinsAmount: z.number().min(0),
  proteinsUnit: NutritionUnitSchema,

  fatsAmount: z.number().min(0),
  fatsUnit: NutritionUnitSchema,

  sugarAmount: z.number().min(0),
  sugarUnit: NutritionUnitSchema,

  ironAmount: z.number().min(0),
  ironUnit: NutritionUnitSchema,

  sodiumAmount: z.number().min(0),
  sodiumUnit: NutritionUnitSchema,

  potassiumAmount: z.number().min(0),
  potassiumUnit: NutritionUnitSchema,

  vitaminC: z.number().min(0),
  vitaminCUnit: NutritionUnitSchema,

  vitaminB6: z.number().min(0),
  vitaminB6Unit: NutritionUnitSchema,

  vitaminB12: z.number().min(0),
  vitaminB12Unit: NutritionUnitSchema
})

/**
 * Legacy response schema for backward compatibility
 * @deprecated Use MealScanResponseSchema instead
 */
export const LegacyNutritionResponseSchema = z.object({
  id: z.string(),
  certainty_percentage: z.number().min(0).max(100),
  name: z.string(),
  keywords: z.array(z.string()).optional(),
  type_of_food: FoodTypeSchema,
  proteins: z.string(),
  carbs: z.string(),
  fats: z.string(),
  vitamins: z.array(
    z.object({
      vitamin_name: z.string(),
      vitamin_portion: z.string()
    })
  )
})

// Type exports for TypeScript
export type TMealScanResponse = z.infer<typeof MealScanResponseSchema>
export type TMealScanRequest = z.infer<typeof MealScanRequestSchema>
export type TFileUpload = z.infer<typeof FileUploadSchema>
export type TMealScanSuccessResponse = z.infer<
  typeof MealScanSuccessResponseSchema
>
export type TMealScanErrorResponse = z.infer<typeof MealScanErrorResponseSchema>
export type TMealScanApiResponse = z.infer<typeof MealScanApiResponseSchema>
export type TNutritionValue = z.infer<typeof NutritionValueSchema>
export type TVitaminInfo = z.infer<typeof VitaminInfoSchema>
export type TIngredientData = z.infer<typeof IngredientDataSchema>
export type TFoodItemData = z.infer<typeof FoodItemDataSchema>
export type TTotalNutrition = z.infer<typeof TotalNutritionSchema>
export type TMealCreationData = z.infer<typeof MealCreationDataSchema>
export type TFoodItemCreationData = z.infer<typeof FoodItemCreationDataSchema>
export type TIngredientCreationData = z.infer<
  typeof IngredientCreationDataSchema
>
export type TLegacyNutritionResponse = z.infer<
  typeof LegacyNutritionResponseSchema
>

/**
 * Helper function to parse nutrition string into structured format for validation
 */
export function createNutritionValueFromString(
  value: string | number
): TNutritionValue {
  if (typeof value === 'number') {
    return { amount: value, unit: NutritionUnit.g }
  }

  const str = String(value).trim()
  const match = str.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/)

  if (match) {
    const amount = parseFloat(match[1])
    const unit = match[2].toLowerCase() as NutritionUnit

    if (Object.values(NutritionUnit).includes(unit)) {
      return { amount, unit }
    }
  }

  const numericValue = parseFloat(str)
  if (!isNaN(numericValue)) {
    return { amount: numericValue, unit: NutritionUnit.g }
  }

  return { amount: 0, unit: NutritionUnit.g }
}

/**
 * Validates if a value conforms to nutrition value format
 */
export function isValidNutritionValue(
  value: unknown
): value is TNutritionValue {
  try {
    NutritionValueSchema.parse(value)
    return true
  } catch {
    return false
  }
}

