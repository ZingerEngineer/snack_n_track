import { geminiApi } from '../../../services/geminiImageAnalysis.service'
import { extractAllJson5FromText } from '../../../utils/extractJsonFromString'
import { InternalServerError } from '../../../classes/Error'

/**
 * Analyzes image using AI service with proper error handling
 */
export async function analyzeImageWithAI(
  filePath: string,
  snackModelGuidance?: string
): Promise<any> {
  const prompt = `
  The image represents 1 or more than one Egyptian Meal, provide a certainty percentage between 0-100%. Include the following fields:

response:{
   meals: Array of Meals (maybe only one meal)
}

Structure of meal object:
Meal : {
   - name: specific name of the meal
   - totalCalories: total calories
   - mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'OTHER'
   - certaintyPercentage: number (0-100)
   - foodItems: Array of Food Items
}

Structure of food item object:
FoodItem: {
   - foodName: Specifc name of the food item.
   - foodType: 'VEGETABLE' | 'FRUIT' | 'GRAIN' | 'DESSERT' | 'BEVERAGE' | 'DAIRY' | 'FATS' | 'NUTS' | 'MEAT' | 'MEAL'
   - portionUnit: 'TEASPOON' | 'TABLESPOON' | 'CUP' | 'MILLILITER' | 'LITER' | 'PINT' | 'QUART' | 'GALLON' | 'GRAM' | 'KILOGRAM' | 'OUNCE' | 'POUND' | 'PINCH' | 'DASH' | 'PIECE' | 'SLICE' | 'SERVING'
   - portionSizeValue: numeric value of the portion size.
   - ingredientString: {
    type: string
    example_format: '<FoodItemName>: <portionValue> <portionUnit>, <Ingredient1> <portionValue> <portionUnit>, [other ingredients with same format till ingredientN]'
   }
   - ingredients: Array of ingredients.
}

Ingredient:{
ingredientName: specific name of the ingredient.
  calories: number
  caloriesUnit: 'CALORIE' | 'KILOCALORIE'.

  carbohydratesAmount: number
  carbohydratesUnit: 'GRAM' | 'MILLIGRAM' | 'MICROGRAM'.

  proteinsAmount: number
  proteinsUnit: 'GRAM' | 'MILLIGRAM' | 'MICROGRAM'.

  fatsAmount: number
  fatsUnit: 'GRAM' | 'MILLIGRAM' | 'MICROGRAM'.

  sugarAmount: number
  sugarUnit: 'GRAM' | 'MILLIGRAM' | 'MICROGRAM'.

  ironAmount: number
  ironUnit: 'MILLIGRAM' | 'MICROGRAM'.

  sodiumAmount: number
  sodiumUnit: 'MILLIGRAM' | 'MICROGRAM'.

  potassiumAmount: number
  potassiumUnit: 'MILLIGRAM' | 'MICROGRAM'.

  vitaminC: number
  vitaminCUnit: 'MILLIGRAM' | 'MICROGRAM'.

  vitaminB6: number
  vitaminB6Unit: 'MILLIGRAM' | 'MICROGRAM'.

  vitaminB12: number
  vitaminB12Unit: 'MILLIGRAM' | 'MICROGRAM'.
}
  Make the ingredients first, then the food items, then the meal.
  ${snackModelGuidance ? `Use the following food items to guide your analysis: ${snackModelGuidance}` : ''}
`

  try {
    const response = await geminiApi(filePath, prompt)

    if (!response?.text) {
      throw new InternalServerError('No response from AI analysis service')
    }

    console.debug(
      '[analyzeImageWithAI] Raw AI response length:',
      response.text.length
    )
    console.log('[analyzeImageWithAI] Raw AI response:', response.text)
    // Extract JSON from response
    const jsonResponse = extractAllJson5FromText(response.text)
    if (!jsonResponse) {
      throw new InternalServerError(
        'Failed to extract valid JSON from AI response'
      )
    }

    const parsedData = (jsonResponse[0] as any)['response']?.meals
    return parsedData
  } catch (error) {
    console.error('[analyzeImageWithAI] AI analysis failed:', error)
    throw new InternalServerError(
      `AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

