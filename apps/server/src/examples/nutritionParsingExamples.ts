/**
 * Example usage and testing of the enhanced nutrition parsing schema
 *
 * This file demonstrates how the updated Zod schema handles nutrition values
 * with units and provides examples of the parsing functionality.
 */

import {
  ScanMealResponseSchema,
  DetailedNutritionResponseSchema
} from '../schemas/meal/scanMeal.zod'
import { NutritionParsingUtils } from '../controllers/mealController/nutritionParsingUtils'

// Example 1: Parsing nutrition strings with units
console.log('=== Nutrition Parsing Examples ===')

const nutritionExamples = [
  '150mg',
  '20g',
  '1.5kg',
  '500mL',
  '250kcal',
  '100',
  '0.5oz'
]

nutritionExamples.forEach((example) => {
  const parsed = NutritionParsingUtils.parseNutritionString(example)
  console.log(`"${example}" -> ${JSON.stringify(parsed)}`)
})

// Example 2: Valid meal response with string nutrition values
const mealResponseWithStringNutrition = {
  certainty_percentage: 85,
  name: 'Grilled Chicken Breast',
  keywords: ['chicken', 'protein', 'grilled'],
  type_of_food: 'MEAL',
  proteins: '25g',
  carbs: '2g',
  fats: '3.5g',
  calories: '165kcal',
  vitamins: [
    {
      vitamin_name: 'Vitamin B6',
      vitamin_portion: '0.6mg'
    },
    {
      vitamin_name: 'Vitamin B12',
      vitamin_portion: '0.3mcg'
    }
  ]
}

console.log('\n=== Schema Validation Examples ===')

try {
  const validated = ScanMealResponseSchema.parse(
    mealResponseWithStringNutrition
  )
  console.log('✅ Standard schema validation passed:')
  console.log(JSON.stringify(validated, null, 2))
} catch (error) {
  console.log('❌ Standard schema validation failed:', error)
}

// Example 3: Testing with the detailed nutrition schema
const detailedNutritionExample = {
  certainty_percentage: 90,
  name: 'Apple',
  type_of_food: 'FRUIT',
  proteins: {
    amount: 0.3,
    unit: 'g'
  },
  carbs: {
    amount: 14,
    unit: 'g'
  },
  fats: {
    amount: 0.2,
    unit: 'g'
  },
  calories: {
    amount: 52,
    unit: 'kcal'
  },
  vitamins: [
    {
      vitamin_name: 'Vitamin C',
      vitamin_portion: {
        amount: 4.6,
        unit: 'mg'
      }
    }
  ]
}

try {
  const detailedValidated = DetailedNutritionResponseSchema.parse(
    detailedNutritionExample
  )
  console.log('\n✅ Detailed nutrition schema validation passed:')
  console.log(JSON.stringify(detailedValidated, null, 2))
} catch (error) {
  console.log('\n❌ Detailed nutrition schema validation failed:', error)
}

// Example 4: Unit conversion examples
console.log('\n=== Unit Conversion Examples ===')

const conversionExamples = [
  { value: { amount: 1000, unit: 'mg' }, target: 'g' },
  { value: { amount: 2, unit: 'kg' }, target: 'g' },
  { value: { amount: 1.5, unit: 'L' }, target: 'mL' }
]

conversionExamples.forEach((example) => {
  const converted = NutritionParsingUtils.convertUnit(
    example.value as any,
    example.target
  )
  console.log(
    `${NutritionParsingUtils.formatNutritionValue(example.value as any)} -> ${NutritionParsingUtils.formatNutritionValue(converted)}`
  )
})

export {}

