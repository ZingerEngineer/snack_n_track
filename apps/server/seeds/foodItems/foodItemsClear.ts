import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearFoodItems() {
  try {
    await prisma.$executeRaw`TRUNCATE TABLE public."FoodItem" RESTART IDENTITY;`
    console.log('FoodItem table truncated and sequence reset successfully.')
  } catch (error) {
    console.error('Error resetting FoodItem table:', error)
    throw error
  }
}

clearFoodItems()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

