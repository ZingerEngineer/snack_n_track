import z from 'zod'
import { mealSchema } from '../meal.zod'

export const backEndScanResponseSchema = z.object({
  success: z.boolean(),
  data: mealSchema.array().optional(),
  error: z.string().optional(),
})
