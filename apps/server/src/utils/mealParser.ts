import {
  MealSchema,
  CreateMealSchema,
  CreateMealWithFoodItemsSchema,
  UpdateMealSchema,
  MealSearchSchema,
  AddFoodItemsToMealSchema,
  RemoveFoodItemsFromMealSchema,
  CalculateMealCaloriesSchema,
  MealStatsSchema,
  TMealSchema,
  TCreateMealSchema,
  TCreateMealWithFoodItemsSchema,
  TUpdateMealSchema,
  TMealSearchSchema,
  TAddFoodItemsToMealSchema,
  TRemoveFoodItemsFromMealSchema,
  TCalculateMealCaloriesSchema,
  TMealStatsSchema
} from '../schemas/meal/meal.zod'

import MealDao from '../daos/meal.dao'
import FoodItemDao from '../daos/foodItem.dao'
import IngredientDao from '../daos/ingredient.dao'
import { NotFoundError, ValidationError } from '../classes/Error'

export class MealParser {
  private mealDao: MealDao
  private foodItemDao: FoodItemDao
  private ingredientDao: IngredientDao

  constructor() {
    this.mealDao = new MealDao()
    this.foodItemDao = new FoodItemDao()
    this.ingredientDao = new IngredientDao()
  }

  /**
   * Parse and validate meal creation data
   */
  parseCreateMeal(data: unknown): TCreateMealSchema {
    return CreateMealSchema.parse(data)
  }

  /**
   * Parse and validate meal creation with food items array
   */
  parseCreateMealWithFoodItems(data: unknown): TCreateMealWithFoodItemsSchema {
    return CreateMealWithFoodItemsSchema.parse(data)
  }

  /**
   * Parse and validate meal update data
   */
  parseUpdateMeal(data: unknown): TUpdateMealSchema {
    return UpdateMealSchema.parse(data)
  }

  /**
   * Parse and validate meal search parameters
   */
  parseMealSearch(searchParams: unknown): TMealSearchSchema {
    return MealSearchSchema.parse(searchParams)
  }

  /**
   * Parse and validate adding food items to meal
   */
  parseAddFoodItemsToMeal(data: unknown): TAddFoodItemsToMealSchema {
    return AddFoodItemsToMealSchema.parse(data)
  }

  /**
   * Parse and validate removing food items from meal
   */
  parseRemoveFoodItemsFromMeal(data: unknown): TRemoveFoodItemsFromMealSchema {
    return RemoveFoodItemsFromMealSchema.parse(data)
  }

  /**
   * Parse and validate calorie calculation request
   */
  parseCalculateMealCalories(data: unknown): TCalculateMealCaloriesSchema {
    return CalculateMealCaloriesSchema.parse(data)
  }

  /**
   * Parse and validate meal statistics request
   */
  parseMealStats(data: unknown): TMealStatsSchema {
    return MealStatsSchema.parse(data)
  }

  /**
   * Validate that all food item IDs exist in the database
   */
  async validateFoodItemIds(foodItemIds: string[]): Promise<boolean> {
    const validatedIds = CalculateMealCaloriesSchema.parse({ foodItemIds })

    const checkPromises = validatedIds.foodItemIds.map(async (foodItemId) => {
      try {
        await this.foodItemDao.getFoodItemById(foodItemId)
        return true
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw new NotFoundError(`Food item with ID '${foodItemId}' not found`)
        }
        throw error
      }
    })

    await Promise.all(checkPromises)
    return true
  }

  /**
   * Calculate total calories for a list of food items
   * This is a simplified calculation - you may want to make it more sophisticated
   */
  async calculateTotalCalories(foodItemIds: string[]): Promise<number> {
    await this.validateFoodItemIds(foodItemIds)

    let totalCalories = 0

    for (const foodItemId of foodItemIds) {
      const foodItem = await this.foodItemDao.getFullFoodItemById(foodItemId, {
        ingredients: true,
        MealFoodItem: false
      })

      // For now, we'll use a basic estimation
      // You can enhance this by calculating from ingredients' actual nutritional data
      if (foodItem.ingredients && foodItem.ingredients.length > 0) {
        // Simplified calculation - you should implement proper ingredient calorie calculation
        // This assumes each ingredient contributes an average of 50 calories per portion
        const estimatedCaloriesPerIngredient = 50
        const ingredientCount = foodItem.ingredients.length
        totalCalories +=
          estimatedCaloriesPerIngredient *
          ingredientCount *
          foodItem.portionSizeValue
      } else {
        // Default calorie estimate if no ingredients data
        totalCalories += 100 * foodItem.portionSizeValue
      }
    }

    return Math.round(totalCalories * 100) / 100 // Round to 2 decimal places
  }

  /**
   * Calculate total calories with proper ingredient data
   * This method fetches ingredient nutrition data for accurate calculation
   */
  async calculateAccurateTotalCalories(foodItemIds: string[]): Promise<number> {
    await this.validateFoodItemIds(foodItemIds)

    let totalCalories = 0

    for (const foodItemId of foodItemIds) {
      const foodItem = await this.foodItemDao.getFullFoodItemById(foodItemId, {
        ingredients: true,
        MealFoodItem: false
      })

      if (foodItem.ingredients && foodItem.ingredients.length > 0) {
        // Calculate calories from each ingredient
        for (const foodIngredient of foodItem.ingredients) {
          try {
            const ingredient = await this.ingredientDao.getIngredientById(
              foodIngredient.ingredientId
            )
            totalCalories += ingredient.calories * foodItem.portionSizeValue
          } catch (error) {
            console.warn(
              `Could not fetch ingredient ${foodIngredient.ingredientId}:`,
              error
            )
            // Fall back to estimated calories if ingredient data is missing
            totalCalories += 50 * foodItem.portionSizeValue
          }
        }
      } else {
        // Default calorie estimate if no ingredients data
        totalCalories += 100 * foodItem.portionSizeValue
      }
    }

    return Math.round(totalCalories * 100) / 100 // Round to 2 decimal places
  }

  /**
   * Validate meal name uniqueness for a user (optional constraint)
   */
  async validateMealNameUniqueness(
    mealName: string,
    userId?: string,
    excludeMealId?: string
  ): Promise<boolean> {
    try {
      const existingMeals = await this.mealDao.getMealsByName(mealName)

      if (userId) {
        const userMeals = existingMeals.filter((meal) => meal.userId === userId)
        if (excludeMealId) {
          const conflictingMeals = userMeals.filter(
            (meal) => meal.id !== excludeMealId
          )
          return conflictingMeals.length === 0
        }
        return userMeals.length === 0
      }

      if (excludeMealId) {
        const conflictingMeals = existingMeals.filter(
          (meal) => meal.id !== excludeMealId
        )
        return conflictingMeals.length === 0
      }

      return existingMeals.length === 0
    } catch (error) {
      if (error instanceof NotFoundError) {
        return true // No existing meals with this name
      }
      throw error
    }
  }

  /**
   * Parse and validate meal creation with automatic calorie calculation
   */
  async parseCreateMealWithAutoCalories(data: {
    name: string
    userId?: string
    foodItemIds: string[]
    useAccurateCalculation?: boolean
  }): Promise<TCreateMealSchema> {
    // Validate food item IDs exist
    await this.validateFoodItemIds(data.foodItemIds)

    // Calculate total calories
    const totalCalories = data.useAccurateCalculation
      ? await this.calculateAccurateTotalCalories(data.foodItemIds)
      : await this.calculateTotalCalories(data.foodItemIds)

    // Create and validate the final meal data
    const mealData = {
      name: data.name,
      userId: data.userId,
      totalCalories,
      foodItemIds: data.foodItemIds
    }

    return this.parseCreateMeal(mealData)
  }
}

// Export a singleton instance
export const mealParser = new MealParser()

