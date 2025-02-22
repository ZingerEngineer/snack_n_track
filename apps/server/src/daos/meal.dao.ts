import { PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'

class MealDao {
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

  async getMealById(mealId: string) {
    const prisma = this.getPrismaClient()
    try {
      const meal = await prisma.meal.findUnique({
        where: { id: mealId }
      })
      if (!meal) throw new NotFoundError('Meal not found')
      return meal
    } catch (error) {
      throw new InternalServerError('Failed to get meal by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getMealsByName(name: string) {
    const prisma = this.getPrismaClient()
    try {
      const meals = await prisma.meal.findMany({
        where: { name: name }
      })
      if (meals.length === 0) throw new NotFoundError('No meals found')
      return meals
    } catch (error) {
      throw new InternalServerError('Failed to get meals by name')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getAllMeals(limit: number = 10, offset: number = 0) {
    const prisma = this.getPrismaClient()
    try {
      const meals = await prisma.meal.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
      })
      if (meals.length === 0) throw new NotFoundError('No meals found')
      return meals
    } catch (error) {
      throw new InternalServerError('Failed to get all meals.')
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default MealDao

