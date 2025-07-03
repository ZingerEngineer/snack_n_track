import { z } from 'zod'

// Nutrition units (matching the mobile types)
const nutritionUnits = [
  // Mass units
  'g',
  'kg',
  'mg',
  'mcg',
  // Volume units
  'L',
  'mL',
  'mcL',
  // Energy units
  'kcal',
  'kJ',
  // Additional units
  'oz',
  'lb'
] as const

// Helper function to parse nutrition values like "150mg", "20g", etc.
const parseNutritionValue = (value: string | number) => {
  if (typeof value === 'number') {
    return { amount: value, unit: 'g' as const }
  }

  const str = String(value).trim()

  // Match patterns like "150mg", "20g", "1.5kg", etc.
  const match = str.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/)

  if (match) {
    const amount = parseFloat(match[1])
    const unit = match[2].toLowerCase()

    // Validate unit against known nutrition units
    if (nutritionUnits.includes(unit as any)) {
      return { amount, unit: unit as (typeof nutritionUnits)[number] }
    }
  }

  // Fallback: try to parse as number with default unit
  const numericValue = parseFloat(str)
  if (!isNaN(numericValue)) {
    return { amount: numericValue, unit: 'g' as const }
  }

  // If all parsing fails, return zero with default unit
  return { amount: 0, unit: 'g' as const }
}

// Custom Zod schema for nutrition values
const nutritionValueSchema = z
  .union([z.string(), z.number()])
  .transform(parseNutritionValue)
  .refine((parsed) => parsed.amount >= 0, {
    message: 'Nutrition amount must be non-negative'
  })

// File validation schema
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

// Scan meal request validation
export const ScanMealRequestSchema = z.object({
  userId: z.string().uuid('Invalid user ID format').optional(),
  mealName: z
    .string()
    .min(1, 'Meal name is required')
    .max(200, 'Meal name is too long')
    .optional()
    .default('Scanned Meal'),
  mealType: z
    .enum(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'OTHER'])
    .optional()
    .default('OTHER'),
  saveToHistory: z.boolean().optional().default(true)
})

// Scan meal response schema for validation
const foodTypes = [
  'VEGETABLE',
  'FRUIT',
  'GRAIN',
  'DESSERT',
  'BEVERAGE',
  'MEAL'
] as const

const caseInsensitiveEnum = <T extends readonly string[]>(values: T) =>
  z
    .string()
    .transform((val) => val.toUpperCase())
    .refine((val) => (values as readonly string[]).includes(val), {
      message: `Value must be one of: ${values.join(', ')}`
    }) as unknown as z.ZodType<T[number], any, any>

export const ScanMealResponseSchema = z.object({
  certainty_percentage: z.coerce.number().min(0).max(100),
  name: z.string().optional(),
  estimated_name: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  type_of_food: caseInsensitiveEnum(foodTypes).optional(),
  estimated_typeOfFood: caseInsensitiveEnum(foodTypes).optional(),
  proteins: nutritionValueSchema.optional(),
  carbs: nutritionValueSchema.optional(),
  fats: nutritionValueSchema.optional(),
  calories: nutritionValueSchema.optional(),
  vitamins: z
    .array(
      z.object({
        vitamin_name: z.string(),
        vitamin_portion: nutritionValueSchema
      })
    )
    .optional()
})

// Enhanced nutrition response schema with detailed unit information
export const DetailedNutritionResponseSchema = z.object({
  certainty_percentage: z.coerce.number().min(0).max(100),
  name: z.string().optional(),
  estimated_name: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  type_of_food: caseInsensitiveEnum(foodTypes).optional(),
  estimated_typeOfFood: caseInsensitiveEnum(foodTypes).optional(),

  // Detailed nutrition with amount and unit
  proteins: z
    .object({
      amount: z.number().min(0),
      unit: z.enum(nutritionUnits)
    })
    .optional(),

  carbs: z
    .object({
      amount: z.number().min(0),
      unit: z.enum(nutritionUnits)
    })
    .optional(),

  fats: z
    .object({
      amount: z.number().min(0),
      unit: z.enum(nutritionUnits)
    })
    .optional(),

  calories: z
    .object({
      amount: z.number().min(0),
      unit: z.enum(['kcal', 'kJ'])
    })
    .optional(),

  vitamins: z
    .array(
      z.object({
        vitamin_name: z.string(),
        vitamin_portion: z.object({
          amount: z.number().min(0),
          unit: z.enum(nutritionUnits)
        })
      })
    )
    .optional()
})

// Type exports
export type TScanMealRequest = z.infer<typeof ScanMealRequestSchema>
export type TScanMealResponse = z.infer<typeof ScanMealResponseSchema>
export type TDetailedNutritionResponse = z.infer<
  typeof DetailedNutritionResponseSchema
>
export type TFileUpload = z.infer<typeof FileUploadSchema>
export type TNutritionValue = {
  amount: number
  unit: (typeof nutritionUnits)[number]
}

