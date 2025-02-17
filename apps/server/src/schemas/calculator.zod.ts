import z from 'zod'
import createUUID from '../utils/createUUID'

const NutritionDataSchema = z.object({
  id: z.string().default(() => createUUID()),
  percentage_of_certainty: z.number(),
  isSure: z.boolean(),
  name: z.string(),
  type_of_food: z.enum([
    'Vegetable',
    'Fruit',
    'Grain',
    'Dessert',
    'Beverage',
    'Meal'
  ]),
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

const EstimatedNutritionDataSchema = z.object({
  id: z.string().default(() => createUUID()),
  percentage_of_certainty: z.number(),
  isSure: z.boolean(),
  estimated_name: z.string(),
  estimated_typeOfFood: z.enum([
    'Vegetable',
    'Fruit',
    'Grain',
    'Dessert',
    'Beverage',
    'Meal'
  ])
})

const FailureObjectSchema = z.object({
  status: z.literal('failed')
})

export {
  NutritionDataSchema,
  EstimatedNutritionDataSchema,
  FailureObjectSchema
}

