import { PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'

export interface UserHealthTrackingData {
  userId: string
  weight?: number
  height?: number
  BMI?: number
  sugarLevel?: number
  bloodPressure?: string
  cholesterolLevel?: number
  dietaryPreference?: string
  activityLevel?: string
  dateRecorded?: Date
}

class UserHealthTrackingDAO {
  private prisma: PrismaClient | null = null

  private getPrismaClient() {
    if (!this.prisma) {
      console.log(
        '[UserHealthTrackingDAO.getPrismaClient] No existing Prisma client found. Creating a new one.'
      )
      try {
        this.prisma = new PrismaClient()
        console.log(
          '[UserHealthTrackingDAO.getPrismaClient] Prisma client created successfully.'
        )
      } catch (error) {
        console.error(
          '[UserHealthTrackingDAO.getPrismaClient] Error creating Prisma client:',
          error
        )
        throw new InternalServerError('Failed to connect to database')
      }
    } else {
      console.log(
        '[UserHealthTrackingDAO.getPrismaClient] Reusing existing Prisma client.'
      )
    }
    return this.prisma
  }

  private async closePrismaClient() {
    if (this.prisma) {
      console.log(
        '[UserHealthTrackingDAO.closePrismaClient] Disconnecting Prisma client.'
      )
      try {
        await this.prisma.$disconnect()
        console.log(
          '[UserHealthTrackingDAO.closePrismaClient] Prisma client disconnected successfully.'
        )
      } catch (error) {
        console.error(
          '[UserHealthTrackingDAO.closePrismaClient] Error disconnecting Prisma client:',
          error
        )
        throw new InternalServerError('Failed to disconnect from database')
      }
      this.prisma = null
    } else {
      console.log(
        '[UserHealthTrackingDAO.closePrismaClient] No Prisma client to disconnect.'
      )
    }
  }

  async getUserHealthTracking(userId: string) {
    console.log(
      `[UserHealthTrackingDAO.getUserHealthTracking] Fetching health tracking for user: ${userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      const healthTracking = await prisma.userHealthTracking.findMany({
        where: { userId },
        orderBy: { dateRecorded: 'desc' },
        take: 1 // Get the most recent record
      })

      console.log(
        `[UserHealthTrackingDAO.getUserHealthTracking] Successfully fetched health tracking for user: ${userId}`
      )
      return healthTracking.length > 0 ? healthTracking[0] : null
    } catch (error) {
      console.error(
        `[UserHealthTrackingDAO.getUserHealthTracking] Error fetching health tracking for user ${userId}:`,
        error
      )
      throw new InternalServerError('Failed to get user health tracking')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getAllUserHealthTracking(userId: string, limit: number = 10) {
    console.log(
      `[UserHealthTrackingDAO.getAllUserHealthTracking] Fetching all health tracking for user: ${userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      const healthTrackingRecords = await prisma.userHealthTracking.findMany({
        where: { userId },
        orderBy: { dateRecorded: 'desc' },
        take: limit
      })

      console.log(
        `[UserHealthTrackingDAO.getAllUserHealthTracking] Successfully fetched ${healthTrackingRecords.length} health tracking records for user: ${userId}`
      )
      return healthTrackingRecords
    } catch (error) {
      console.error(
        `[UserHealthTrackingDAO.getAllUserHealthTracking] Error fetching health tracking records for user ${userId}:`,
        error
      )
      throw new InternalServerError(
        'Failed to get user health tracking records'
      )
    } finally {
      await this.closePrismaClient()
    }
  }

  async createUserHealthTracking(data: Omit<UserHealthTrackingData, 'id'>) {
    console.log(
      `[UserHealthTrackingDAO.createUserHealthTracking] Creating health tracking for user: ${data.userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      const healthTracking = await prisma.userHealthTracking.create({
        data: {
          ...data,
          dateRecorded: data.dateRecorded || new Date()
        }
      })

      console.log(
        `[UserHealthTrackingDAO.createUserHealthTracking] Health tracking created successfully for user: ${data.userId}`
      )
      return healthTracking
    } catch (error) {
      console.error(
        `[UserHealthTrackingDAO.createUserHealthTracking] Error creating health tracking for user ${data.userId}:`,
        error
      )
      throw new InternalServerError('Failed to create user health tracking')
    } finally {
      await this.closePrismaClient()
    }
  }

  async updateUserHealthTracking(
    trackingId: string,
    data: Partial<UserHealthTrackingData>
  ) {
    console.log(
      `[UserHealthTrackingDAO.updateUserHealthTracking] Updating health tracking: ${trackingId}`
    )
    const prisma = this.getPrismaClient()
    try {
      const healthTracking = await prisma.userHealthTracking.update({
        where: { id: trackingId },
        data
      })

      console.log(
        `[UserHealthTrackingDAO.updateUserHealthTracking] Health tracking updated successfully: ${trackingId}`
      )
      return healthTracking
    } catch (error) {
      console.error(
        `[UserHealthTrackingDAO.updateUserHealthTracking] Error updating health tracking ${trackingId}:`,
        error
      )
      throw new InternalServerError('Failed to update user health tracking')
    } finally {
      await this.closePrismaClient()
    }
  }

  async upsertUserHealthTracking(data: Omit<UserHealthTrackingData, 'id'>) {
    console.log(
      `[UserHealthTrackingDAO.upsertUserHealthTracking] Upserting health tracking for user: ${data.userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      // Check if user has existing health tracking from today
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const existingRecord = await prisma.userHealthTracking.findFirst({
        where: {
          userId: data.userId,
          dateRecorded: {
            gte: today,
            lt: tomorrow
          }
        }
      })

      let healthTracking
      if (existingRecord) {
        // Update existing record
        healthTracking = await prisma.userHealthTracking.update({
          where: { id: existingRecord.id },
          data: {
            ...data,
            dateRecorded: data.dateRecorded || new Date()
          }
        })
      } else {
        // Create new record
        healthTracking = await prisma.userHealthTracking.create({
          data: {
            ...data,
            dateRecorded: data.dateRecorded || new Date()
          }
        })
      }

      console.log(
        `[UserHealthTrackingDAO.upsertUserHealthTracking] Health tracking upserted successfully for user: ${data.userId}`
      )
      return healthTracking
    } catch (error) {
      console.error(
        `[UserHealthTrackingDAO.upsertUserHealthTracking] Error upserting health tracking for user ${data.userId}:`,
        error
      )
      throw new InternalServerError('Failed to upsert user health tracking')
    } finally {
      await this.closePrismaClient()
    }
  }

  async deleteUserHealthTracking(trackingId: string) {
    console.log(
      `[UserHealthTrackingDAO.deleteUserHealthTracking] Deleting health tracking: ${trackingId}`
    )
    const prisma = this.getPrismaClient()
    try {
      await prisma.userHealthTracking.delete({
        where: { id: trackingId }
      })

      console.log(
        `[UserHealthTrackingDAO.deleteUserHealthTracking] Health tracking deleted successfully: ${trackingId}`
      )
      return true
    } catch (error) {
      console.error(
        `[UserHealthTrackingDAO.deleteUserHealthTracking] Error deleting health tracking ${trackingId}:`,
        error
      )
      throw new InternalServerError('Failed to delete user health tracking')
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default UserHealthTrackingDAO

