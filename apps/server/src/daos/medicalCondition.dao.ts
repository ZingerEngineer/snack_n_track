import { PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'

export interface MedicalConditionData {
  conditionName: string
  decscription?: string
  symptoms?: string
  treatment?: string
  medications?: string
}

export interface UserMedicalConditionData {
  userId: string
  medicalConditionId: string
}

class MedicalConditionDAO {
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

  async getMedicalConditionById(id: string) {
    console.log(
      `[MedicalConditionDAO.getMedicalConditionById] Fetching medical condition by ID: ${id}`
    )
    const prisma = this.getPrismaClient()
    try {
      const condition = await prisma.medicalCondition.findMany({
        where: { id }
      })

      if (!condition) {
        throw new NotFoundError('Medical condition not found')
      }

      console.log(
        `[MedicalConditionDAO.getMedicalConditionById] Medical condition fetched successfully for ID: ${id}`
      )
      return condition
    } catch (error) {
      console.error(
        `[MedicalConditionDAO.getMedicalConditionById] Error fetching medical condition by ID ${id}:`,
        error
      )
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new InternalServerError('Failed to get medical condition by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async createMedicalCondition(data: MedicalConditionData) {
    console.log(
      `[MedicalConditionDAO.createMedicalCondition] Creating medical condition: ${data.conditionName}`
    )
    const prisma = this.getPrismaClient()
    try {
      const newCondition = await prisma.medicalCondition.create({
        data
      })
      console.log(
        `[MedicalConditionDAO.createMedicalCondition] Medical condition created successfully: ${data.conditionName}`
      )
      return newCondition
    } catch (error) {
      console.error(
        `[MedicalConditionDAO.createMedicalCondition] Error creating medical condition ${data.conditionName}:`,
        error
      )
      throw new InternalServerError('Failed to create medical condition')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getUserMedicalConditions(userId: string) {
    console.log(
      `[MedicalConditionDAO.getUserMedicalConditions] Fetching medical conditions for user: ${userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      const userConditions = await prisma.userMedicalCondition.findMany({
        where: { userId },
        include: {
          medicalCondition: true
        }
      })

      const conditions = userConditions.map((uc) => uc.medicalCondition)
      console.log(
        `[MedicalConditionDAO.getUserMedicalConditions] Successfully fetched ${conditions.length} medical conditions for user: ${userId}`
      )
      return conditions
    } catch (error) {
      console.error(
        `[MedicalConditionDAO.getUserMedicalConditions] Error fetching medical conditions for user ${userId}:`,
        error
      )
      throw new InternalServerError('Failed to get user medical conditions')
    } finally {
      await this.closePrismaClient()
    }
  }

  async addUserMedicalCondition(userId: string, medicalConditionId: string) {
    console.log(
      `[MedicalConditionDAO.addUserMedicalCondition] Adding medical condition ${medicalConditionId} to user ${userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      const userCondition = await prisma.userMedicalCondition.create({
        data: {
          userId,
          medicalConditionId
        },
        include: {
          medicalCondition: true
        }
      })
      console.log(
        `[MedicalConditionDAO.addUserMedicalCondition] Medical condition added successfully to user: ${userId}`
      )
      return userCondition
    } catch (error) {
      console.error(
        `[MedicalConditionDAO.addUserMedicalCondition] Error adding medical condition to user ${userId}:`,
        error
      )
      throw new InternalServerError('Failed to add medical condition to user')
    } finally {
      await this.closePrismaClient()
    }
  }

  async removeUserMedicalCondition(userId: string, medicalConditionId: string) {
    console.log(
      `[MedicalConditionDAO.removeUserMedicalCondition] Removing medical condition ${medicalConditionId} from user ${userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      await prisma.userMedicalCondition.delete({
        where: {
          userId_medicalConditionId: {
            userId,
            medicalConditionId
          }
        }
      })
      console.log(
        `[MedicalConditionDAO.removeUserMedicalCondition] Medical condition removed successfully from user: ${userId}`
      )
      return true
    } catch (error) {
      console.error(
        `[MedicalConditionDAO.removeUserMedicalCondition] Error removing medical condition from user ${userId}:`,
        error
      )
      throw new InternalServerError(
        'Failed to remove medical condition from user'
      )
    } finally {
      await this.closePrismaClient()
    }
  }

  async updateUserMedicalConditions(
    userId: string,
    medicalConditionIds: string[]
  ) {
    console.log(
      `[MedicalConditionDAO.updateUserMedicalConditions] Updating medical conditions for user: ${userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      // Use transaction to ensure atomicity
      await prisma.$transaction(async (tx) => {
        // Remove all existing medical conditions for this user
        await tx.userMedicalCondition.deleteMany({
          where: { userId }
        })

        // Add new medical conditions
        if (medicalConditionIds.length > 0) {
          await tx.userMedicalCondition.createMany({
            data: medicalConditionIds.map((conditionId) => ({
              userId,
              medicalConditionId: conditionId
            }))
          })
        }
      })

      console.log(
        `[MedicalConditionDAO.updateUserMedicalConditions] Medical conditions updated successfully for user: ${userId}`
      )
      return true
    } catch (error) {
      console.error(
        `[MedicalConditionDAO.updateUserMedicalConditions] Error updating medical conditions for user ${userId}:`,
        error
      )
      throw new InternalServerError('Failed to update user medical conditions')
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default MedicalConditionDAO

