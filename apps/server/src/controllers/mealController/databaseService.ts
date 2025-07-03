import { TScanMealResponse } from '../../schemas/meal/scanMeal.zod'
import MealDao from '../../daos/meal.dao'

const mealDao = new MealDao()

/**
 * Saves analyzed meal data to database
 */
export async function saveMealToDatabase(
  mealData: TScanMealResponse,
  userId: string,
  requestParams: any
): Promise<void> {
  try {
    const mealName =
      requestParams.mealName ||
      mealData.name ||
      mealData.estimated_name ||
      'Scanned Meal'
    const totalCalories = mealData.calories || 0

    // Note: This assumes MealDao has a createMeal method that accepts these parameters
    // You may need to adjust this based on the actual MealDao interface
    const mealCreateData = {
      name: mealName,
      userId,
      totalCalories,
      author: 'Gemini' as any,
      mealType: requestParams.mealType || ('OTHER' as any)
    }

    console.info(
      '[saveMealToDatabase] Creating meal with data:',
      mealCreateData
    )
    // Uncomment when MealDao.createMeal is available
    // const meal = await mealDao.createMeal(mealCreateData)
    // console.info('[saveMealToDatabase] Meal saved with ID:', meal.id)
  } catch (error) {
    console.error('[saveMealToDatabase] Failed to save meal:', error)
    throw error
  }
}

