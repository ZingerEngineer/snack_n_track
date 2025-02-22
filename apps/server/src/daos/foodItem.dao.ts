import { PortionUnit, PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'
import ScanMealDao from './scanMeal.dao'
import MealDao from './meal.dao'
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
      MealScanFoodItem: boolean
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
      MealScanFoodItem: boolean
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
    ingredients: string[]
    MealFoodItem?: string[]
    MealScanFoodItem?: string[]
  }) {
    const prisma = this.getPrismaClient()
    try {
      const {
        foodName,
        portionUnit,
        portionSizeValue,
        ingredients,
        MealFoodItem,
        MealScanFoodItem
      } = foodItem

      const ingredientDao = new IngredientDao()
      const ingredientList = await Promise.all(
        ingredients.map(async (ingredient) => {
          const currentIngredient =
            await ingredientDao.getIngredientByName(ingredient)
          return currentIngredient[0]
        })
      )

      let mealFoodItemList: {
        id: string
        name: string
        userId: string | null
        createdAt: Date
        totalCalories: number
      }[] = []
      if (MealFoodItem) {
        const mealDao = new MealDao()
        mealFoodItemList = await Promise.all(
          MealFoodItem.map(async (mealName) => {
            const currentMeal = await mealDao.getMealsByName(mealName)
            return currentMeal[0]
          })
        )
      }

      let mealScanFoodItemList: {
        id: string
        name: string
        userId: string
        isChatGPTMade: boolean
        scanDate: Date
        confidenceScore: number
        approvalStatus: string
      }[] = []
      if (MealScanFoodItem) {
        const scanMealDao = new ScanMealDao()
        mealScanFoodItemList = await Promise.all(
          MealScanFoodItem.map(async (scanMealName) => {
            const currentScanMeal =
              await scanMealDao.getScanMealsByName(scanMealName)
            return currentScanMeal[0]
          })
        )
      }

      const newFoodItem = await prisma.foodItem.create({
        data: {
          foodName,
          portionUnit,
          portionSizeValue,
          ingredients: {
            connect: ingredientList.map((ingredient) => ({
              ingredientId: ingredient.id
            }))
          },
          ...(mealFoodItemList.length > 0 && {
            MealFoodItem: {
              connect: mealFoodItemList.map((meal) => ({
                mealId: meal.id
              }))
            }
          }),
          ...(mealScanFoodItemList.length > 0 && {
            MealScanFoodItem: {
              connect: mealScanFoodItemList.map((scanMeal) => ({
                id: scanMeal.id
              }))
            }
          })
        }
      })

      return newFoodItem
    } catch (error) {
      throw new InternalServerError('Failed to create food item')
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default FoodItemDao

