import { geminiApi } from '../../services/geminiImageAnalysis.service'
import { extractJsonFromString } from '../../utils/extractJsonFromString'
import { InternalServerError } from '../../classes/Error'

/**
 * Analyzes image using AI service with proper error handling
 */
export async function analyzeImageWithAI(
  filePath: string,
  mealName?: string
): Promise<any> {
  const prompt = `Analyze the image of food. Please tell me what is inside the image and provide approximate nutritional data with a certainty level based on the clarity and coherence of the food representation. Your response should be formatted as JSON.

1. If the image is clear and coherently represents the food parts, provide a certainty percentage between 90-100%. Include the following fields:
   - certainty_percentage: number (0-100)
   - name: specific name of the food
   - keywords: array of keywords/names in Arabic and English
   - type_of_food: categorize as Vegetable, Fruit, Grain, Dessert, Beverage, or Meal
   - proteins: amount in grams
   - carbs: amount in grams  
   - fats: amount in grams
   - calories: total calories
   - vitamins: array of {vitamin_name, vitamin_portion}

2. If the image is blurry or food is not coherent enough, provide certainty 60-90%:
   - certainty_percentage: number (0-100)
   - estimated_name: best estimate of food name
   - estimated_typeOfFood: categorize as above

${mealName ? `Note: User suggested this might be "${mealName}"` : ''}

Analyze the image and provide only the JSON response.`

  try {
    const response = await geminiApi(filePath, prompt)

    if (!response?.text) {
      throw new InternalServerError('No response from AI analysis service')
    }

    console.debug(
      '[analyzeImageWithAI] Raw AI response length:',
      response.text.length
    )

    // Extract JSON from response
    const jsonResponse = extractJsonFromString(response.text)
    if (!jsonResponse) {
      throw new InternalServerError(
        'Failed to extract valid JSON from AI response'
      )
    }

    return jsonResponse
  } catch (error) {
    console.error('[analyzeImageWithAI] AI analysis failed:', error)
    throw new InternalServerError(
      `AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

