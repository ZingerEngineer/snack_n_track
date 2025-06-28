import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearIngredients() {
  try {
    const deleted = await prisma.ingredient.deleteMany({})
    console.log(`Deleted ${deleted.count} ingredients.`)
  } catch (error) {
    console.error('Error clearing ingredients:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

clearIngredients()
