import { PrismaClient, MealType } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'

class MealDao {
  private prisma: PrismaClient | null = null

  private getPrismaClient() {
    if (!this.prisma) {
      try {
        console.log('[MealDao] Initializing PrismaClient...')
        this.prisma = new PrismaClient()
      } catch (error) {
        console.error('[MealDao] Error connecting to database:', error)
        throw new InternalServerError('Failed to connect to the database')
      }
    }
    return this.prisma
  }

  private async closePrismaClient() {
    if (this.prisma) {
      try {
        console.log('[MealDao] Disconnecting PrismaClient...')
        await this.prisma.$disconnect()
      } catch (error) {
        console.error('[MealDao] Error disconnecting from database:', error)
        throw new InternalServerError('Failed to disconnect from the database')
      }
      this.prisma = null
    }
  }

  async getMealById(mealId: string, includeDeleted: boolean = false) {
    console.log(`[MealDao] getMealById: ${mealId}`)
    const prisma = this.getPrismaClient()
    try {
      const whereCondition: any = { id: mealId }

      // Exclude soft-deleted meals by default
      if (!includeDeleted) {
        whereCondition.deletedAt = null
      }

      const meal = await prisma.meal.findUnique({
        where: whereCondition
      })
      if (!meal) {
        console.error('[MealDao] Meal not found for ID:', mealId)
        throw new NotFoundError('Meal not found')
      }
      console.log('[MealDao] Meal found:', meal)
      return meal
    } catch (error) {
      console.error('[MealDao] Error retrieving meal by ID:', error)
      throw new InternalServerError('Failed to get meal by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getMealsByName(name: string) {
    console.log(`[MealDao] getMealsByName: ${name}`)
    const prisma = this.getPrismaClient()
    try {
      const meals = await prisma.meal.findMany({
        where: { name: name }
      })
      if (meals.length === 0) {
        console.error('[MealDao] No meals found for name:', name)
        throw new NotFoundError('No meals found')
      }
      console.log('[MealDao] Meals found:', meals)
      return meals
    } catch (error) {
      console.error('[MealDao] Error retrieving meals by name:', error)
      throw new InternalServerError('Failed to get meals by name')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getMealsByUserId(
    userId: string,
    limit: number = 10,
    offset: number = 0,
    includeDeleted: boolean = false
  ) {
    console.log(`[MealDao] getMealsByUserId: ${userId}`)
    const prisma = this.getPrismaClient()
    try {
      const whereCondition: any = { userId: userId }

      // Exclude soft-deleted meals by default
      if (!includeDeleted) {
        whereCondition.deletedAt = null
      }

      const meals = await prisma.meal.findMany({
        where: whereCondition,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
      })
      if (meals.length === 0) {
        console.error('[MealDao] No meals found for user:', userId)
        throw new NotFoundError('No meals found for user')
      }
      console.log('[MealDao] User meals found:', meals.length)
      return meals
    } catch (error) {
      console.error('[MealDao] Error retrieving meals by user ID:', error)
      throw new InternalServerError('Failed to get meals by user ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getAllMeals(
    limit: number = 10,
    offset: number = 0,
    includeDeleted: boolean = false
  ) {
    console.log(`[MealDao] getAllMeals with limit: ${limit}, offset: ${offset}`)
    const prisma = this.getPrismaClient()
    try {
      const whereCondition: any = {}

      // Exclude soft-deleted meals by default
      if (!includeDeleted) {
        whereCondition.deletedAt = null
      }

      const meals = await prisma.meal.findMany({
        where: whereCondition,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
      })
      if (meals.length === 0) {
        console.error('[MealDao] No meals found')
        throw new NotFoundError('No meals found')
      }
      console.log('[MealDao] All meals retrieved:', meals.length)
      return meals
    } catch (error) {
      console.error('[MealDao] Error retrieving all meals:', error)
      throw new InternalServerError('Failed to get all meals.')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getFullMealById(
    mealId: string,
    include: {
      user: boolean
      foodItems: boolean
    },
    includeDeleted: boolean = false
  ) {
    console.log(
      `[MealDao] getFullMealById: ${mealId} with include ${JSON.stringify(include)}`
    )
    const prisma = this.getPrismaClient()
    try {
      const mealIncludeOptions: any = {}

      if (include.user) {
        mealIncludeOptions.user = {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }

      if (include.foodItems) {
        mealIncludeOptions.foodItems = {
          include: {
            foodItem: {
              include: {
                ingredients: {
                  include: {
                    ingredient: true
                  }
                }
              }
            }
          }
        }
      }

      const whereCondition: any = { id: mealId }

      // Exclude soft-deleted meals by default
      if (!includeDeleted) {
        whereCondition.deletedAt = null
      }

      const meal = await prisma.meal.findUnique({
        where: whereCondition,
        include: mealIncludeOptions
      })

      if (!meal) {
        console.error('[MealDao] Full meal not found for ID:', mealId)
        throw new NotFoundError('Meal not found')
      }

      console.log('[MealDao] Full meal found:', meal)
      return meal
    } catch (error) {
      console.error('[MealDao] Error retrieving full meal by ID:', error)
      throw new InternalServerError('Failed to get full meal by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async createMeal(data: {
    name: string
    userId?: string
    totalCalories: number
    author: string
    mealType: MealType
    certaintyPercentage?: number
  }) {
    console.log(`[MealDao] createMeal called with name: ${data.name}`)
    try {
      const prisma = this.getPrismaClient()
      const {
        name,
        userId,
        totalCalories,
        author,
        mealType,
        certaintyPercentage
      } = data

      console.log('[MealDao] Creating new meal...')
      const newMeal = await prisma.meal.create({
        data: {
          name,
          userId,
          totalCalories,
          author,
          mealType,
          certaintyPercentage: certaintyPercentage || 0
        }
      })

      console.log('[MealDao] New meal created with ID:', newMeal.id)
      return newMeal
    } catch (error) {
      console.error('[MealDao] Error creating meal:', error)
      throw new InternalServerError('Failed to create meal')
    } finally {
      await this.closePrismaClient()
    }
  }

  async createMealWithFoodItems(data: {
    name: string
    userId?: string
    totalCalories: number
    author: string
    mealType: MealType
    certaintyPercentage?: number
    foodItemIds: string[]
  }) {
    console.log(
      `[MealDao] createMealWithFoodItems called with name: ${data.name}`
    )
    try {
      const prisma = this.getPrismaClient()
      const {
        name,
        userId,
        totalCalories,
        author,
        mealType,
        certaintyPercentage,
        foodItemIds
      } = data

      console.log('[MealDao] Creating meal with food items...')
      const newMeal = await prisma.meal.create({
        data: {
          name,
          userId,
          totalCalories,
          author,
          mealType,
          certaintyPercentage: certaintyPercentage || 0,
          foodItems: {
            create: foodItemIds.map((foodItemId) => ({
              foodItem: {
                connect: { id: foodItemId }
              }
            }))
          }
        },
        include: {
          foodItems: {
            include: {
              foodItem: true
            }
          }
        }
      })

      console.log(
        '[MealDao] New meal with food items created with ID:',
        newMeal.id
      )
      return newMeal
    } catch (error) {
      console.error('[MealDao] Error creating meal with food items:', error)
      throw new InternalServerError('Failed to create meal with food items')
    } finally {
      await this.closePrismaClient()
    }
  }

  async updateMeal(data: {
    id: string
    name?: string
    totalCalories?: number
    author?: string
    mealType?: MealType
    certaintyPercentage?: number
  }) {
    console.log(`[MealDao] updateMeal called for ID: ${data.id}`)
    try {
      const prisma = this.getPrismaClient()
      const { id, ...updateData } = data

      // Remove undefined fields
      const cleanUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined)
      )

      if (Object.keys(cleanUpdateData).length === 0) {
        throw new InternalServerError('No valid fields provided for update')
      }

      // Add updatedAt timestamp
      const updateDataWithTimestamp = {
        ...cleanUpdateData,
        updatedAt: new Date()
      }

      console.log('[MealDao] Updating meal with data:', updateDataWithTimestamp)
      const updatedMeal = await prisma.meal.update({
        where: { id },
        data: updateDataWithTimestamp
      })

      console.log('[MealDao] Meal updated successfully:', updatedMeal)
      return updatedMeal
    } catch (error: any) {
      console.error('[MealDao] Error updating meal:', error)
      if (error.code === 'P2025') {
        throw new NotFoundError('Meal not found')
      }
      throw new InternalServerError('Failed to update meal')
    } finally {
      await this.closePrismaClient()
    }
  }

  async deleteMeal(mealId: string, softDelete: boolean = true) {
    console.log(`[MealDao] deleteMeal called for ID: ${mealId}`)
    try {
      const prisma = this.getPrismaClient()

      if (softDelete) {
        console.log('[MealDao] Soft deleting meal...')
        const deletedMeal = await prisma.meal.update({
          where: { id: mealId },
          data: {
            deletedAt: new Date(),
            updatedAt: new Date()
          }
        })
        console.log('[MealDao] Meal soft deleted successfully:', deletedMeal)
        return deletedMeal
      } else {
        console.log('[MealDao] Hard deleting meal...')
        const deletedMeal = await prisma.meal.delete({
          where: { id: mealId }
        })
        console.log('[MealDao] Meal hard deleted successfully:', deletedMeal)
        return deletedMeal
      }
    } catch (error: any) {
      console.error('[MealDao] Error deleting meal:', error)
      if (error.code === 'P2025') {
        throw new NotFoundError('Meal not found')
      }
      throw new InternalServerError('Failed to delete meal')
    } finally {
      await this.closePrismaClient()
    }
  }

  async addFoodItemsToMeal(mealId: string, foodItemIds: string[]) {
    console.log(`[MealDao] addFoodItemsToMeal called for meal: ${mealId}`)
    try {
      const prisma = this.getPrismaClient()

      console.log('[MealDao] Adding food items to meal...')
      const result = await prisma.mealFoodItem.createMany({
        data: foodItemIds.map((foodItemId) => ({
          mealId,
          foodId: foodItemId
        })),
        skipDuplicates: true // Prevent errors if relationship already exists
      })

      console.log('[MealDao] Food items added to meal:', result)
      return result
    } catch (error) {
      console.error('[MealDao] Error adding food items to meal:', error)
      throw new InternalServerError('Failed to add food items to meal')
    } finally {
      await this.closePrismaClient()
    }
  }

  async removeFoodItemsFromMeal(mealId: string, foodItemIds: string[]) {
    console.log(`[MealDao] removeFoodItemsFromMeal called for meal: ${mealId}`)
    try {
      const prisma = this.getPrismaClient()

      console.log('[MealDao] Removing food items from meal...')
      const result = await prisma.mealFoodItem.deleteMany({
        where: {
          mealId,
          foodId: {
            in: foodItemIds
          }
        }
      })

      console.log('[MealDao] Food items removed from meal:', result)
      return result
    } catch (error) {
      console.error('[MealDao] Error removing food items from meal:', error)
      throw new InternalServerError('Failed to remove food items from meal')
    } finally {
      await this.closePrismaClient()
    }
  }

  async searchMeals(params: {
    name?: string
    userId?: string
    author?: string
    mealType?: MealType
    startDate?: Date
    endDate?: Date
    minCalories?: number
    maxCalories?: number
    limit?: number
    offset?: number
    includeDeleted?: boolean
  }) {
    console.log('[MealDao] searchMeals called with params:', params)
    try {
      const prisma = this.getPrismaClient()
      const {
        name,
        userId,
        author,
        mealType,
        startDate,
        endDate,
        minCalories,
        maxCalories,
        limit = 10,
        offset = 0,
        includeDeleted = false
      } = params

      const whereConditions: any = {}

      // Exclude soft-deleted meals by default
      if (!includeDeleted) {
        whereConditions.deletedAt = null
      }

      if (name) {
        whereConditions.name = {
          contains: name,
          mode: 'insensitive'
        }
      }

      if (userId) {
        whereConditions.userId = userId
      }

      if (author) {
        whereConditions.author = author
      }

      if (mealType) {
        whereConditions.mealType = mealType
      }

      if (startDate || endDate) {
        whereConditions.createdAt = {}
        if (startDate) {
          whereConditions.createdAt.gte = startDate
        }
        if (endDate) {
          whereConditions.createdAt.lte = endDate
        }
      }

      if (minCalories || maxCalories) {
        whereConditions.totalCalories = {}
        if (minCalories) {
          whereConditions.totalCalories.gte = minCalories
        }
        if (maxCalories) {
          whereConditions.totalCalories.lte = maxCalories
        }
      }

      console.log('[MealDao] Search conditions:', whereConditions)
      const meals = await prisma.meal.findMany({
        where: whereConditions,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
      })

      console.log('[MealDao] Search results found:', meals.length)
      return meals
    } catch (error) {
      console.error('[MealDao] Error searching meals:', error)
      throw new InternalServerError('Failed to search meals')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getMealCount(userId?: string, includeDeleted: boolean = false) {
    console.log('[MealDao] getMealCount called')
    try {
      const prisma = this.getPrismaClient()

      const whereCondition: any = userId ? { userId } : {}

      // Exclude soft-deleted meals by default
      if (!includeDeleted) {
        whereCondition.deletedAt = null
      }

      const count = await prisma.meal.count({
        where: whereCondition
      })

      console.log('[MealDao] Meal count:', count)
      return count
    } catch (error) {
      console.error('[MealDao] Error getting meal count:', error)
      throw new InternalServerError('Failed to get meal count')
    } finally {
      await this.closePrismaClient()
    }
  }

  async restoreMeal(mealId: string) {
    console.log(`[MealDao] restoreMeal called for ID: ${mealId}`)
    try {
      const prisma = this.getPrismaClient()

      console.log('[MealDao] Restoring meal...')
      const restoredMeal = await prisma.meal.update({
        where: { id: mealId },
        data: {
          deletedAt: null,
          updatedAt: new Date()
        }
      })

      console.log('[MealDao] Meal restored successfully:', restoredMeal)
      return restoredMeal
    } catch (error: any) {
      console.error('[MealDao] Error restoring meal:', error)
      if (error.code === 'P2025') {
        throw new NotFoundError('Meal not found')
      }
      throw new InternalServerError('Failed to restore meal')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getDeletedMeals(
    userId?: string,
    limit: number = 10,
    offset: number = 0
  ) {
    console.log('[MealDao] getDeletedMeals called')
    try {
      const prisma = this.getPrismaClient()

      const whereCondition: any = {
        deletedAt: { not: null } // Only get meals that have been soft deleted
      }

      if (userId) {
        whereCondition.userId = userId
      }

      const deletedMeals = await prisma.meal.findMany({
        where: whereCondition,
        skip: offset,
        take: limit,
        orderBy: { deletedAt: 'desc' } // Order by deletion date, most recent first
      })

      console.log('[MealDao] Deleted meals found:', deletedMeals.length)
      return deletedMeals
    } catch (error) {
      console.error('[MealDao] Error getting deleted meals:', error)
      throw new InternalServerError('Failed to get deleted meals')
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default MealDao

