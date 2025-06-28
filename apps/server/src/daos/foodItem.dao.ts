import { PortionUnit, PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'
import IngredientDao from './ingredient.dao'

class FoodItemDao {
  private prisma: PrismaClient | null = null

  private getPrismaClient() {
    if (!this.prisma) {
      try {
        this.prisma = new PrismaClient()
      } catch (error) {
        console.log(error)
        throw new InternalServerError('Failed to connect to database')
      }
    }
    return this.prisma
  }

  private async closePrismaClient() {
    if (this.prisma) {
      try {
        await this.prisma.$disconnect()
      } catch (error) {
        throw new InternalServerError('Failed to disconnect from database')
      }
      this.prisma = null
    }
  }

  async getFoodItemById(foodItemId: string) {
    const prisma = this.getPrismaClient()
    try {
      const foodItem = await prisma.foodItem.findUnique({
        where: { id: foodItemId }
      })
      if (!foodItem) throw new NotFoundError('Food item not found')
      return foodItem
    } catch (error) {
      throw new InternalServerError('Failed to get food item by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getFoodItemByName(name: string) {
    const prisma = this.getPrismaClient()
    try {
      const foodItems = await prisma.foodItem.findMany({
        where: { foodName: name }
      })
      if (foodItems.length === 0) throw new NotFoundError('No food items found')
      return foodItems
    } catch (error) {
      throw new InternalServerError('Failed to get food items by name')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getFullFoodItemById(
    foodItemId: string,
    include: {
      MealFoodItem: boolean
      ingredients: boolean
    }
  ) {
    const prisma = this.getPrismaClient()
    try {
      const foodItemWithNutrition = await prisma.foodItem.findUnique({
        where: { id: foodItemId },
        include: include
      })
      if (!foodItemWithNutrition) throw new NotFoundError('Food item not found')
      return foodItemWithNutrition
    } catch (error) {
      throw new InternalServerError(
        'Failed to get food item with nutrition by ID'
      )
    } finally {
      await this.closePrismaClient()
    }
  }

  async getFullFoodItemByName(
    name: string,
    include: {
      MealFoodItem: boolean
      ingredients: boolean
    }
  ) {
    const prisma = this.getPrismaClient()
    try {
      const foodItemsWithNutrition = await prisma.foodItem.findMany({
        where: { foodName: name },
        include: include
      })
      if (foodItemsWithNutrition.length === 0)
        throw new NotFoundError('No food items found')
      return foodItemsWithNutrition
    } catch (error) {
      throw new InternalServerError(
        'Failed to get food items with nutrition by name'
      )
    } finally {
      await this.closePrismaClient()
    }
  }

  async createFoodItem(foodItem: {
    foodName: string
    portionUnit: PortionUnit
    portionSizeValue: number
    ingredientString: string
    ingredients: string[]
  }) {
    try {
      const prisma = this.getPrismaClient()
      const {
        foodName,
        portionUnit,
        portionSizeValue,
        ingredients,
        ingredientString
      } = foodItem

      const ingredientDao = new IngredientDao()
      // Get the ingredient objects by name and extract their IDs
      const ingredientList = await Promise.all(
        ingredients.map(async (ingredientName) => {
          const currentIngredient =
            await ingredientDao.getIngredientByName(ingredientName)
          if (!currentIngredient || currentIngredient.length === 0) {
            throw new NotFoundError(`Ingredient '${ingredientName}' not found`)
          }
          return { ingredientId: currentIngredient[0].id }
        })
      )

      if (ingredientList.length === 0) {
        throw new NotFoundError('No valid ingredients found')
      }

      // Create the food item with proper Prisma relation syntax
      const newFoodItem = await prisma.foodItem.create({
        data: {
          foodName,
          portionUnit,
          portionSizeValue,
          ingredientString,
          ingredients: {
            create: ingredientList.map((ingredient) => ({
              ingredient: {
                connect: { id: ingredient.ingredientId }
              }
            }))
          }
        },
        include: {
          ingredients: {
            include: {
              ingredient: true
            }
          }
        }
      })

      return newFoodItem
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError('Failed to create food item')
    } finally {
      await this.closePrismaClient()
    }
  }

  async createFoodItemWithIngredientIds(foodItem: {
    foodName: string
    portionUnit: PortionUnit
    portionSizeValue: number
    ingredientString: string
    ingredientIds: string[]
  }) {
    try {
      const prisma = this.getPrismaClient()
      const {
        foodName,
        portionUnit,
        portionSizeValue,
        ingredientIds,
        ingredientString
      } = foodItem

      if (ingredientIds.length === 0) {
        throw new NotFoundError('At least one ingredient ID is required')
      }

      // Create the food item with proper Prisma relation syntax using ingredient IDs
      const newFoodItem = await prisma.foodItem.create({
        data: {
          foodName,
          portionUnit,
          portionSizeValue,
          ingredientString,
          ingredients: {
            create: ingredientIds.map((ingredientId) => ({
              ingredient: {
                connect: { id: ingredientId }
              }
            }))
          }
        },
        include: {
          ingredients: {
            include: {
              ingredient: true
            }
          }
        }
      })

      return newFoodItem
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError(
        'Failed to create food item with ingredient IDs'
      )
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default FoodItemDao

