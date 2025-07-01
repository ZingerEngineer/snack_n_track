import z from 'zod'
import createUUID from '../utils/global/createUUID'

// Food type enum schema matching Prisma schema
const FoodTypeSchema = z.enum(['VEGETABLE', 'FRUIT', 'GRAIN', 'DESSERT', 'BEVERAGE', 'MEAL'])

// Legacy food type enum for backward compatibility
const LegacyFoodTypeSchema = z.enum(['Vegetable', 'Fruit', 'Grain', 'Dessert', 'Beverage', 'Meal'])

const NutritionDataSchema = z.object({
  id: z.string().default(() => createUUID()),
  certainty_percentage: z.number(),
  isSure: z.boolean(),
  name: z.string(),
  keywords: z.array(z.string()),
  type_of_food: FoodTypeSchema, // Updated to use new enum
  proteins: z.string(),
  carbs: z.string(),
  fats: z.string(),
  vitamins: z.array(
    z.object({
      vitamin_name: z.string(),
      vitamin_portion: z.string(),
    }),
  ),
})

// Legacy schema for backward compatibility
const LegacyNutritionDataSchema = z.object({
  id: z.string().default(() => createUUID()),
  certainty_percentage: z.number(),
  isSure: z.boolean(),
  name: z.string(),
  keywords: z.array(z.string()),
  type_of_food: LegacyFoodTypeSchema,
  proteins: z.string(),
  carbs: z.string(),
  fats: z.string(),
  vitamins: z.array(
    z.object({
      vitamin_name: z.string(),
      vitamin_portion: z.string(),
    }),
  ),
})

const EstimatedNutritionDataSchema = z.object({
  id: z.string().default(() => createUUID()),
  certainty_percentage: z.number(),
  isSure: z.boolean(),
  estimated_name: z.string(),
  estimated_typeOfFood: FoodTypeSchema, // Updated to use new enum
})

export {
  NutritionDataSchema,
  EstimatedNutritionDataSchema,
  LegacyNutritionDataSchema,
  FoodTypeSchema,
  LegacyFoodTypeSchema,
}
