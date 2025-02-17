import { PrismaClient } from '@prisma/client'
import { InternalServerError } from './Error'

class PrismaGlobal {
  private static prisma: PrismaClient | null = null

  public static getPrismaClient() {
    if (!this.prisma) {
      try {
        this.prisma = new PrismaClient()
      } catch (error) {
        throw new InternalServerError('Failed to connect to database')
      }
    }
    return this.prisma
  }

  public static async closePrismaClient() {
    if (this.prisma) {
      try {
        await this.prisma.$disconnect()
      } catch (error) {
        throw new InternalServerError('Failed to disconnect from database')
      }
      this.prisma = null
    }
  }
}

export default PrismaGlobal

