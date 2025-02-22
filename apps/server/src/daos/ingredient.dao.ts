import { PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'

class IngredientDao {
  private prisma: PrismaClient | null = null

  private getPrismaClient() {
    if (!this.prisma) {
      try {
        this.prisma = new PrismaClient()
      } catch (error) {
        console.log(error)
        throw new InternalServerError('Failed to connect to the database')
      }
    }
    return this.prisma
  }

  private async closePrismaClient() {
    if (this.prisma) {
      try {
        await this.prisma.$disconnect()
      } catch (error) {
        throw new InternalServerError('Failed to disconnect from the database')
      }
      this.prisma = null
    }
  }

  async getIngredientById(ingredientId: string) {
    const prisma = this.getPrismaClient()
    try {
      const ingredient = await prisma.ingredient.findUnique({
        where: { id: ingredientId }
      })
      if (!ingredient) throw new NotFoundError('Ingredient not found')
      return ingredient
    } catch (error) {
      throw new InternalServerError('Failed to retrieve ingredient by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getIngredientByName(name: string) {
    const prisma = this.getPrismaClient()
    try {
      const ingredients = await prisma.ingredient.findMany({
        where: { ingredientName: name }
      })
      if (ingredients.length === 0)
        throw new NotFoundError('No ingredients found')
      return ingredients
    } catch (error) {
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
    const prisma = this.getPrismaClient()
    try {
      const ingredientWithNutrition = await prisma.ingredient.findUnique({
        where: { id: ingredientId },
        include: include
      })
      if (!ingredientWithNutrition)
        throw new NotFoundError('Ingredient with nutrition not found')
      return ingredientWithNutrition
    } catch (error) {
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
    const prisma = this.getPrismaClient()
    try {
      const ingredientsWithNutrition = await prisma.ingredient.findMany({
        where: { ingredientName: name },
        include: include
      })
      if (ingredientsWithNutrition.length === 0)
        throw new NotFoundError('No ingredients with nutrition found')
      return ingredientsWithNutrition
    } catch (error) {
      throw new InternalServerError(
        'Failed to retrieve ingredients with nutrition by name'
      )
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default IngredientDao

