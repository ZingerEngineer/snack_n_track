import { NutritionUnit, PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'
import FoodItemDao from './foodItem.dao'

class IngredientDao {
  private prisma: PrismaClient | null = null

  private getPrismaClient() {
    if (!this.prisma) {
      try {
        console.log('[IngredientDao] Initializing PrismaClient...')
        this.prisma = new PrismaClient()
      } catch (error) {
        console.error('[IngredientDao] Error connecting to database:', error)
        throw new InternalServerError('Failed to connect to the database')
      }
    }
    return this.prisma
  }

  private async closePrismaClient() {
    if (this.prisma) {
      try {
        console.log('[IngredientDao] Disconnecting PrismaClient...')
        await this.prisma.$disconnect()
      } catch (error) {
        console.error(
          '[IngredientDao] Error disconnecting from database:',
          error
        )
        throw new InternalServerError('Failed to disconnect from the database')
      }
      this.prisma = null
    }
  }

  async getIngredientById(ingredientId: string) {
    console.log(`[IngredientDao] getIngredientById: ${ingredientId}`)
    const prisma = this.getPrismaClient()
    try {
      const ingredient = await prisma.ingredient.findUnique({
        where: { id: ingredientId }
      })
      if (!ingredient) {
        console.error(
          '[IngredientDao] Ingredient not found for ID:',
          ingredientId
        )
        throw new NotFoundError('Ingredient not found')
      }
      console.log('[IngredientDao] Ingredient found:', ingredient)
      return ingredient
    } catch (error) {
      console.error('[IngredientDao] Error retrieving ingredient by ID:', error)
      throw new InternalServerError('Failed to retrieve ingredient by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getIngredientByName(name: string) {
    console.log(`[IngredientDao] getIngredientByName: ${name}`)
    const prisma = this.getPrismaClient()
    try {
      const ingredients = await prisma.ingredient.findMany({
        where: { ingredientName: name }
      })
      if (ingredients.length === 0) {
        console.error('[IngredientDao] No ingredients found for name:', name)
        throw new NotFoundError('No ingredients found')
      }
      console.log('[IngredientDao] Ingredients found:', ingredients)
      return ingredients
    } catch (error) {
      console.error(
        '[IngredientDao] Error retrieving ingredients by name:',
        error
      )
      throw new InternalServerError('Failed to retrieve ingredients by name')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getFullIngredientById(
    ingredientId: string,
    include: {
      nutrition: boolean
      FoodIngredient: boolean
    }
  ) {
    console.log(
      `[IngredientDao] getFullIngredientById: ${ingredientId} with include ${JSON.stringify(
        include
      )}`
    )
    const prisma = this.getPrismaClient()
    try {
      const ingredientWithNutrition = await prisma.ingredient.findUnique({
        where: { id: ingredientId },
        include: include
      })
      if (!ingredientWithNutrition) {
        console.error(
          '[IngredientDao] Ingredient with nutrition not found for ID:',
          ingredientId
        )
        throw new NotFoundError('Ingredient with nutrition not found')
      }
      console.log(
        '[IngredientDao] Full ingredient found:',
        ingredientWithNutrition
      )
      return ingredientWithNutrition
    } catch (error) {
      console.error(
        '[IngredientDao] Error retrieving ingredient with nutrition by ID:',
        error
      )
      throw new InternalServerError(
        'Failed to retrieve ingredient with nutrition by ID'
      )
    } finally {
      await this.closePrismaClient()
    }
  }

  async getFullIngredientByName(
    name: string,
    include: {
      nutrition: boolean
      FoodIngredient: boolean
    }
  ) {
    console.log(
      `[IngredientDao] getFullIngredientByName: ${name} with include ${JSON.stringify(
        include
      )}`
    )
    const prisma = this.getPrismaClient()
    try {
      const ingredientsWithNutrition = await prisma.ingredient.findMany({
        where: { ingredientName: name },
        include: include
      })
      if (ingredientsWithNutrition.length === 0) {
        console.error(
          '[IngredientDao] No ingredients with nutrition found for name:',
          name
        )
        throw new NotFoundError('No ingredients with nutrition found')
      }
      console.log(
        '[IngredientDao] Full ingredients found:',
        ingredientsWithNutrition
      )
      return ingredientsWithNutrition
    } catch (error) {
      console.error(
        '[IngredientDao] Error retrieving ingredients with nutrition by name:',
        error
      )
      throw new InternalServerError(
        'Failed to retrieve ingredients with nutrition by name'
      )
    } finally {
      await this.closePrismaClient()
    }
  }

  async createIngredient(data: {
    ingredientName: string
    calories?: number
    caloriesUnit?: NutritionUnit
    carbohydratesAmount?: number
    carbohydratesUnit?: NutritionUnit
    proteinsAmount?: number
    proteinsUnit?: NutritionUnit
    fatsAmount?: number
    fatsUnit?: NutritionUnit
    sugarAmount?: number
    sugarUnit?: NutritionUnit
    ironAmount?: number
    ironUnit?: NutritionUnit
    sodiumAmount?: number
    sodiumUnit?: NutritionUnit
    potassiumAmount?: number
    potassiumUnit?: NutritionUnit
    vitaminC?: number
    vitaminCUnit?: NutritionUnit
    vitaminB6?: number
    vitaminB6Unit?: NutritionUnit
    vitaminB12?: number
    vitaminB12Unit?: NutritionUnit
  }) {
    console.log(
      `[IngredientDao] createIngredient called with ingredientName: ${data.ingredientName}`
    )
    try {
      const prisma = this.getPrismaClient()

      console.log(
        '[IngredientDao] Creating new ingredient with validated data...'
      )
      const newIngredient = await prisma.ingredient.create({
        data
      })

      console.log(
        '[IngredientDao] New ingredient created with ID:',
        newIngredient.id
      )
      console.log('[IngredientDao] createIngredient completed successfully.')
      return newIngredient
    } catch (error) {
      console.error('[IngredientDao] Error in createIngredient:', error)
      throw new InternalServerError('Failed to create ingredient')
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default IngredientDao

