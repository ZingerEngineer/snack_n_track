import {
  IngredientsForFoodItemSchema,
  IngredientNamesSchema,
  TIngredientsForFoodItemSchema,
  TIngredientNamesSchema,
  CreateIngredientSchema,
  TCreateIngredientSchema,
  UpdateIngredientSchema,
  TUpdateIngredientSchema,
  IngredientSearchSchema,
  TIngredientSearchSchema
} from '../schemas/ingredient/ingredient.zod'

import { CreateFoodItemWithNamesSchema } from '../schemas/meal/foodItem.zod'
import IngredientDao from '../daos/ingredient.dao'
import { NotFoundError, ValidationError } from '../classes/Error'
import { NutritionUnit } from '@prisma/client'

export class IngredientParser {
  private ingredientDao: IngredientDao

  constructor() {
    this.ingredientDao = new IngredientDao()
  }

  /**
   * Parse and validate ingredient IDs for food item creation
   */
  parseIngredientIds(ingredientIds: unknown): TIngredientsForFoodItemSchema {
    return IngredientsForFoodItemSchema.parse(ingredientIds)
  }

  /**
   * Parse and validate ingredient names
   */
  parseIngredientNames(ingredientNames: unknown): TIngredientNamesSchema {
    return IngredientNamesSchema.parse(ingredientNames)
  }

  /**
   * Convert ingredient names to ingredient IDs (useful for the DAO layer)
   */
  async convertNamesToIds(
    ingredientNames: string[]
  ): Promise<TIngredientsForFoodItemSchema> {
    const validatedNames = this.parseIngredientNames(ingredientNames)

    const ingredientIds = await Promise.all(
      validatedNames.map(async (ingredientName) => {
        const ingredients =
          await this.ingredientDao.getIngredientByName(ingredientName)
        if (!ingredients || ingredients.length === 0) {
          throw new NotFoundError(`Ingredient '${ingredientName}' not found`)
        }
        return { id: ingredients[0].id }
      })
    )

    return ingredientIds
  }

  /**
   * Parse food item creation request with ingredient names and convert to proper format
   */
  async parseFoodItemWithNames(data: unknown): Promise<{
    foodName: string
    portionUnit: any
    portionSizeValue: number
    ingredientString: string
    ingredientIds: string[]
  }> {
    const validatedData = CreateFoodItemWithNamesSchema.parse(data)
    const ingredientIds = await this.convertNamesToIds(
      validatedData.ingredients
    )

    return {
      foodName: validatedData.foodName,
      portionUnit: validatedData.portionUnit,
      portionSizeValue: validatedData.portionSizeValue,
      ingredientString: validatedData.ingredientString,
      ingredientIds: ingredientIds.map((ing) => ing.id)
    }
  }

  /**
   * Validate that all ingredient IDs exist in the database
   */
  async validateIngredientIds(ingredientIds: string[]): Promise<boolean> {
    const validatedIds = this.parseIngredientIds(
      ingredientIds.map((id) => ({ id }))
    )

    const checkPromises = validatedIds.map(async (ingredient) => {
      try {
        await this.ingredientDao.getIngredientById(ingredient.id)
        return true
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw new NotFoundError(
            `Ingredient with ID '${ingredient.id}' not found`
          )
        }
        throw error
      }
    })

    await Promise.all(checkPromises)
    return true
  }

  /**
   * Parse and validate a complete ingredient with nutrition data
   */
  parseCreateIngredient(data: unknown): TCreateIngredientSchema {
    return CreateIngredientSchema.parse(data)
  }

  /**
   * Parse and validate ingredient update data
   */
  parseUpdateIngredient(data: unknown): TUpdateIngredientSchema {
    return UpdateIngredientSchema.parse(data)
  }

  /**
   * Parse ingredient search parameters
   */
  parseIngredientSearch(searchParams: unknown): TIngredientSearchSchema {
    return IngredientSearchSchema.parse(searchParams)
  }

  /**
   * Validate that nutrition unit values are correct
   */
  validateNutritionUnits(data: {
    caloriesUnit?: string
    carbohydratesUnit?: string
    proteinsUnit?: string
    fatsUnit?: string
    sugarUnit?: string
    ironUnit?: string
    sodiumUnit?: string
    potassiumUnit?: string
    vitaminCUnit?: string
    vitaminB6Unit?: string
    vitaminB12Unit?: string
  }): boolean {
    const validUnits = Object.values(NutritionUnit)

    for (const [key, value] of Object.entries(data)) {
      if (value && !validUnits.includes(value as any)) {
        throw new ValidationError(`Invalid nutrition unit for ${key}: ${value}`)
      }
    }

    return true
  }
}

// Export a singleton instance
export const ingredientParser = new IngredientParser()

