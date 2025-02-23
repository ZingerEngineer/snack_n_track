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

  async createIngredientNutrition(data: {
    ingredientId: string
    carbohydratesAmount: number
    carbohydratesUnit: string

    proteinsAmount: number
    proteinsUnit: string

    fatsAmount: number
    fatsUnit: string

    saturatedFatAmount: number
    saturatedFatUnit: string

    unsaturatedFatAmount: number
    unsaturatedFatUnit: string

    transFatAmount: number
    transFatUnit: string

    fiberAmount: number
    fiberUnit: string

    sugarsAmount: number
    sugarsUnit: string

    cholesterolAmount: number
    cholesterolUnit: string

    sodiumAmount: number
    sodiumUnit: string

    potassiumAmount: number
    potassiumUnit: string

    calciumAmount: number
    calciumUnit: string

    ironAmount: number
    ironUnit: string

    magnesiumAmount: number
    magnesiumUnit: string

    zincAmount: number
    zincUnit: string

    vitaminAAmount: number
    vitaminAUnit: string

    vitaminB1Amount: number
    vitaminB1Unit: string

    vitaminB2Amount: number
    vitaminB2Unit: string

    vitaminB3Amount: number
    vitaminB3Unit: string

    vitaminB5Amount: number
    vitaminB5Unit: string

    vitaminB6Amount: number
    vitaminB6Unit: string

    vitaminB7Amount: number
    vitaminB7Unit: string

    vitaminB9Amount: number
    vitaminB9Unit: string

    vitaminB12Amount: number
    vitaminB12Unit: string

    vitaminCAmount: number
    vitaminCUnit: string

    vitaminDAmount: number
    vitaminDUnit: string

    vitaminEAmount: number
    vitaminEUnit: string

    vitaminKAmount: number
    vitaminKUnit: string
  }) {
    console.log(
      '[IngredientDao] createIngredientNutrition called with data:',
      data
    )
    try {
      const prisma = this.getPrismaClient()
      const nutrition = await prisma.ingredientNutrition.create({
        data: {
          ingredientId: data.ingredientId,
          carbohydratesAmount: data.carbohydratesAmount,
          carbohydratesUnit:
            NutritionUnit[data.carbohydratesUnit as keyof typeof NutritionUnit],
          proteinsAmount: data.proteinsAmount,
          proteinsUnit:
            NutritionUnit[data.proteinsUnit as keyof typeof NutritionUnit],
          fatsAmount: data.fatsAmount,
          fatsUnit: NutritionUnit[data.fatsUnit as keyof typeof NutritionUnit],
          saturatedFatAmount: data.saturatedFatAmount,
          saturatedFatUnit:
            NutritionUnit[data.saturatedFatUnit as keyof typeof NutritionUnit],
          unsaturatedFatAmount: data.unsaturatedFatAmount,
          unsaturatedFatUnit:
            NutritionUnit[
              data.unsaturatedFatUnit as keyof typeof NutritionUnit
            ],
          transFatAmount: data.transFatAmount,
          transFatUnit:
            NutritionUnit[data.transFatUnit as keyof typeof NutritionUnit],
          fiberAmount: data.fiberAmount,
          fiberUnit:
            NutritionUnit[data.fiberUnit as keyof typeof NutritionUnit],
          sugarsAmount: data.sugarsAmount,
          sugarsUnit:
            NutritionUnit[data.sugarsUnit as keyof typeof NutritionUnit],
          cholesterolAmount: data.cholesterolAmount,
          cholesterolUnit:
            NutritionUnit[data.cholesterolUnit as keyof typeof NutritionUnit],
          sodiumAmount: data.sodiumAmount,
          sodiumUnit:
            NutritionUnit[data.sodiumUnit as keyof typeof NutritionUnit],
          potassiumAmount: data.potassiumAmount,
          potassiumUnit:
            NutritionUnit[data.potassiumUnit as keyof typeof NutritionUnit],
          calciumAmount: data.calciumAmount,
          calciumUnit:
            NutritionUnit[data.calciumUnit as keyof typeof NutritionUnit],
          ironAmount: data.ironAmount,
          ironUnit: NutritionUnit[data.ironUnit as keyof typeof NutritionUnit],
          magnesiumAmount: data.magnesiumAmount,
          magnesiumUnit:
            NutritionUnit[data.magnesiumUnit as keyof typeof NutritionUnit],
          zincAmount: data.zincAmount,
          zincUnit: NutritionUnit[data.zincUnit as keyof typeof NutritionUnit],
          vitaminAAmount: data.vitaminAAmount,
          vitaminAUnit:
            NutritionUnit[data.vitaminAUnit as keyof typeof NutritionUnit],
          vitaminB1Amount: data.vitaminB1Amount,
          vitaminB1Unit:
            NutritionUnit[data.vitaminB1Unit as keyof typeof NutritionUnit],
          vitaminB2Amount: data.vitaminB2Amount,
          vitaminB2Unit:
            NutritionUnit[data.vitaminB2Unit as keyof typeof NutritionUnit],
          vitaminB3Amount: data.vitaminB3Amount,
          vitaminB3Unit:
            NutritionUnit[data.vitaminB3Unit as keyof typeof NutritionUnit],
          vitaminB5Amount: data.vitaminB5Amount,
          vitaminB5Unit:
            NutritionUnit[data.vitaminB5Unit as keyof typeof NutritionUnit],
          vitaminB6Amount: data.vitaminB6Amount,
          vitaminB6Unit:
            NutritionUnit[data.vitaminB6Unit as keyof typeof NutritionUnit],
          vitaminB7Amount: data.vitaminB7Amount,
          vitaminB7Unit:
            NutritionUnit[data.vitaminB7Unit as keyof typeof NutritionUnit],
          vitaminB9Amount: data.vitaminB9Amount,
          vitaminB9Unit:
            NutritionUnit[data.vitaminB9Unit as keyof typeof NutritionUnit],
          vitaminB12Amount: data.vitaminB12Amount,
          vitaminB12Unit:
            NutritionUnit[data.vitaminB12Unit as keyof typeof NutritionUnit],
          vitaminCAmount: data.vitaminCAmount,
          vitaminCUnit:
            NutritionUnit[data.vitaminCUnit as keyof typeof NutritionUnit],
          vitaminDAmount: data.vitaminDAmount,
          vitaminDUnit:
            NutritionUnit[data.vitaminDUnit as keyof typeof NutritionUnit],
          vitaminEAmount: data.vitaminEAmount,
          vitaminEUnit:
            NutritionUnit[data.vitaminEUnit as keyof typeof NutritionUnit],
          vitaminKAmount: data.vitaminKAmount,
          vitaminKUnit:
            NutritionUnit[data.vitaminKUnit as keyof typeof NutritionUnit]
        }
      })
      console.log('[IngredientDao] Ingredient nutrition created:', nutrition)
      return nutrition
    } catch (error) {
      console.error(
        '[IngredientDao] Error creating ingredient nutrition:',
        error
      )
      throw new InternalServerError('Failed to create ingredient nutrition')
    } finally {
      await this.closePrismaClient()
    }
  }

  async createIngredient(data: {
    ingredientName: string
    amount: number
    nutrition: string[]
    FoodIngredient: string[]
  }) {
    console.log(
      `[IngredientDao] createIngredient called with ingredientName: ${data.ingredientName}, amount: ${data.amount}`
    )
    try {
      const foodItemDao = new FoodItemDao()
      const prisma = this.getPrismaClient()
      const { ingredientName, amount, nutrition, FoodIngredient } = data

      console.log('[IngredientDao] Creating new ingredient...')
      const newIngredient = await prisma.ingredient.create({
        data: {
          ingredientName,
          amount
        }
      })
      console.log(
        '[IngredientDao] New ingredient created with ID:',
        newIngredient.id
      )

      console.log(
        '[IngredientDao] Fetching FoodItems for FoodIngredient names...'
      )
      const foodItems = await Promise.all(
        FoodIngredient.map(async (foodItem) => {
          console.log(
            `[IngredientDao] Looking up FoodItem by name: ${foodItem}`
          )
          let currentFoodItem = await foodItemDao.getFoodItemByName(foodItem)
          console.log(
            `[IngredientDao] FoodItem found: ${currentFoodItem[0].foodName} with ID: ${currentFoodItem[0].id}`
          )
          return currentFoodItem[0]
        })
      )
      console.log(
        '[IngredientDao] FoodItems fetched:',
        foodItems.map((fi) => fi.id)
      )

      console.log(
        '[IngredientDao] Checking for existing FoodIngredient records...'
      )
      const existingFoodItemIngredient = await prisma.foodIngredient.findMany({
        where: {
          ingredientId: newIngredient.id,
          foodId: {
            in: foodItems.map((foodItem) => foodItem.id)
          }
        }
      })
      if (existingFoodItemIngredient.length === 0) {
        console.log(
          '[IngredientDao] No existing FoodIngredient records found. Creating new ones...'
        )
        const createManyResult = await prisma.foodIngredient.createMany({
          data: foodItems.map((foodItem) => ({
            ingredientId: newIngredient.id,
            foodId: foodItem.id
          }))
        })
        console.log(
          '[IngredientDao] Created FoodIngredient records:',
          createManyResult
        )
      } else {
        console.log(
          '[IngredientDao] Existing FoodIngredient records found:',
          existingFoodItemIngredient
        )
      }
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

