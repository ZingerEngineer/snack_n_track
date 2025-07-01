import { z } from 'zod'

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
export const ScanMealResponseSchema = z.object({
  certainty_percentage: z.number().min(0).max(100),
  name: z.string().optional(),
  estimated_name: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  type_of_food: z
    .enum(['VEGETABLE', 'FRUIT', 'GRAIN', 'DESSERT', 'BEVERAGE', 'MEAL'])
    .optional(),
  estimated_typeOfFood: z
    .enum(['VEGETABLE', 'FRUIT', 'GRAIN', 'DESSERT', 'BEVERAGE', 'MEAL'])
    .optional(),
  proteins: z.number().min(0).optional(),
  carbs: z.number().min(0).optional(),
  fats: z.number().min(0).optional(),
  calories: z.number().min(0).optional(),
  vitamins: z
    .array(
      z.object({
        vitamin_name: z.string(),
        vitamin_portion: z.number().min(0)
      })
    )
    .optional()
})

export type TScanMealRequest = z.infer<typeof ScanMealRequestSchema>
export type TScanMealResponse = z.infer<typeof ScanMealResponseSchema>
export type TFileUpload = z.infer<typeof FileUploadSchema>

