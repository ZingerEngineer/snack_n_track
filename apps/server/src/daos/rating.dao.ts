import { PrismaClient, Prisma, RatingType, RatingScale } from '@prisma/client'
import { InternalServerError } from '../classes/Error'

export class UserRatingDAO {
  private prisma: PrismaClient | null = null
  private getPrismaClient() {
    if (!this.prisma) {
      console.log(
        '[MedicalConditionDAO.getPrismaClient] No existing Prisma client found. Creating a new one.'
      )
      try {
        this.prisma = new PrismaClient()
        console.log(
          '[MedicalConditionDAO.getPrismaClient] Prisma client created successfully.'
        )
      } catch (error) {
        console.error(
          '[MedicalConditionDAO.getPrismaClient] Error creating Prisma client:',
          error
        )
        throw new InternalServerError('Failed to connect to database')
      }
    } else {
      console.log(
        '[MedicalConditionDAO.getPrismaClient] Reusing existing Prisma client.'
      )
    }
    return this.prisma
  }

  private async closePrismaClient() {
    if (this.prisma) {
      console.log(
        '[MedicalConditionDAO.closePrismaClient] Disconnecting Prisma client.'
      )
      try {
        await this.prisma.$disconnect()
        console.log(
          '[MedicalConditionDAO.closePrismaClient] Prisma client disconnected successfully.'
        )
      } catch (error) {
        console.error(
          '[MedicalConditionDAO.closePrismaClient] Error disconnecting Prisma client:',
          error
        )
        throw new InternalServerError('Failed to disconnect from database')
      }
      this.prisma = null
    } else {
      console.log(
        '[MedicalConditionDAO.closePrismaClient] No Prisma client to disconnect.'
      )
    }
  }
}

