import { $Enums, Prisma, PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'
import { DefaultArgs } from '@prisma/client/runtime/library'

enum PortionUnit {
  // Volume (liquid) measurements
  TEASPOON = 'TEASPOON',
  TABLESPOON = 'TABLESPOON',
  CUP = 'CUP',
  MILLILITER = 'MILLILITER',
  LITER = 'LITER',
  PINT = 'PINT',
  QUART = 'QUART',
  GALLON = 'GALLON',

  // Weight measurements
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
  OUNCE = 'OUNCE',
  POUND = 'POUND',

  // Other generic or small quantity measures
  PINCH = 'PINCH',
  DASH = 'DASH',
  PIECE = 'PIECE',
  SLICE = 'SLICE',
  SERVING = 'SERVING'
}

interface IScanNutrition {
  carbohydratesAmount: number
  carbohydratesUnit: NutritionUnit

  proteinsAmount: number
  proteinsUnit: NutritionUnit

  fatsAmount: number
  fatsUnit: NutritionUnit

  saturatedFatAmount: number
  saturatedFatUnit: NutritionUnit

  unsaturatedFatAmount: number
  unsaturatedFatUnit: NutritionUnit

  transFatAmount: number
  transFatUnit: NutritionUnit

  fiberAmount: number
  fiberUnit: NutritionUnit

  sugarsAmount: number
  sugarsUnit: NutritionUnit

  cholesterolAmount: number
  cholesterolUnit: NutritionUnit

  sodiumAmount: number
  sodiumUnit: NutritionUnit

  potassiumAmount: number
  potassiumUnit: NutritionUnit

  calciumAmount: number
  calciumUnit: NutritionUnit

  ironAmount: number
  ironUnit: NutritionUnit

  magnesiumAmount: number
  magnesiumUnit: NutritionUnit

  zincAmount: number
  zincUnit: NutritionUnit

  vitaminAAmount: number
  vitaminAUnit: NutritionUnit

  vitaminB1Amount: number
  vitaminB1Unit: NutritionUnit

  vitaminB2Amount: number
  vitaminB2Unit: NutritionUnit

  vitaminB3Amount: number
  vitaminB3Unit: NutritionUnit

  vitaminB5Amount: number
  vitaminB5Unit: NutritionUnit

  vitaminB6Amount: number
  vitaminB6Unit: NutritionUnit

  vitaminB7Amount: number
  vitaminB7Unit: NutritionUnit

  vitaminB9Amount: number
  vitaminB9Unit: NutritionUnit

  vitaminB12Amount: number
  vitaminB12Unit: NutritionUnit

  vitaminCAmount: number
  vitaminCUnit: NutritionUnit

  vitaminDAmount: number
  vitaminDUnit: NutritionUnit

  vitaminEAmount: number
  vitaminEUnit: NutritionUnit

  vitaminKAmount: number
  vitaminKUnit: NutritionUnit
}

enum NutritionUnit {
  // Mass units:
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
  MILLIGRAM = 'MILLIGRAM',
  MICROGRAM = 'MICROGRAM',

  // Volume units:
  LITER = 'LITER',
  MILLILITER = 'MILLILITER',
  MICROLITER = 'MICROLITER',

  // Energy units:
  KILOCALORIE = 'KILOCALORIE',
  KILOJOULE = 'KILOJOULE',

  // Additional units:
  OUNCE = 'OUNCE',
  POUND = 'POUND'
}

interface IScanIngredient {
  ingredientName: string
  amount: number
  nutrition: IScanNutrition
}

interface IScanFoodItem {
  foodName: string
  portionUnit: PortionUnit
  portionSizeValue: number
}

interface IScanMealData {
  userId: string
  name: string
  foodItems: IScanFoodItem[]
}

class ScanMealDao {
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

  async getScanMealById(scanMealId: string) {
    const prisma = this.getPrismaClient()
    try {
      const scanMeal = await prisma.mealScan.findUnique({
        where: { id: scanMealId }
      })
      if (!scanMeal) throw new NotFoundError('Meal not found')
      return scanMeal
    } catch (error) {
      throw new InternalServerError('Failed to get meal by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getScanMealsByName(name: string) {
    const prisma = this.getPrismaClient()
    try {
      const scanMeals = await prisma.mealScan.findMany({
        where: { name: name }
      })
      if (scanMeals.length === 0) throw new NotFoundError('No meals found')
      return scanMeals
    } catch (error) {
      throw new InternalServerError('Failed to get meals by name')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getAllScanMeals(limit: number = 10, offset: number = 0) {
    const prisma = this.getPrismaClient()
    try {
      const scanMeals = await prisma.mealScan.findMany({
        skip: offset,
        take: limit,
        orderBy: { scanDate: 'desc' }
      })
      if (scanMeals.length === 0) throw new NotFoundError('No meals found')
      return scanMeals
    } catch (error) {
      throw new InternalServerError('Failed to get all meals.')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getUserScanedMeals(
    limit: number = 10,
    offset: number = 0,
    userId: string
  ) {
    const prisma = this.getPrismaClient()
    try {
      const scanMeals = await prisma.mealScan.findMany({
        where: { userId: userId },
        skip: offset,
        take: limit,
        orderBy: { scanDate: 'desc' }
      })
      if (scanMeals.length === 0) throw new NotFoundError('No meals found')
      return scanMeals
    } catch (error) {
      throw new InternalServerError('Failed to get all meals.')
    } finally {
      await this.closePrismaClient()
    }
  }
  async createScanMeal(data: IScanMealData) {
    try {
      const { userId, name, foodItems } = data

      const prisma = this.getPrismaClient()
      const dbFoodItems: Prisma.Prisma__FoodItemClient<
        {
          id: string
          foodName: string
          portionUnit: $Enums.PortionUnit
          portionSizeValue: number
        } | null,
        null,
        DefaultArgs
      >[] = []
      //First we try to find the food items in the database.
      foodItems.map((foodItem) => {
        let currentFoodItem = prisma.foodItem.findUnique({
          where: { foodName: foodItem.foodName }
        })
        dbFoodItems.push(currentFoodItem)
      })
      if (dbFoodItems.length === 0) {
        //If no food items are found, we create the food items.
        const newFoodItems = foodItems.map((foodItem) =>
          prisma.foodItem.create({
            data: {
              foodName: foodItem.foodName,
              portionUnit: foodItem.portionUnit
                ? foodItem.portionUnit
                : 'SERVING',
              portionSizeValue: foodItem.portionSizeValue
                ? foodItem.portionSizeValue
                : 1
            }
          })
        )
        if (newFoodItems.length === 0) {
          throw new InternalServerError('Failed to create food items')
        }
      }
      //We create the meal

      const scanMeal = await prisma.mealScan.create({
        data: {
          userId: data.userId,
          name: data.name,
          foodItems: data.foodItems
        }
      })
      return scanMeal
    } catch (error) {
      throw new InternalServerError('Failed to create meal')
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default ScanMealDao

