import { PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'

class UserDAO {
  private prisma: PrismaClient | null = null

  private getPrismaClient() {
    if (!this.prisma) {
      console.log(
        '[UserDAO.getPrismaClient] No existing Prisma client found. Creating a new one.'
      )
      try {
        this.prisma = new PrismaClient()
        console.log(
          '[UserDAO.getPrismaClient] Prisma client created successfully.'
        )
      } catch (error) {
        console.error(
          '[UserDAO.getPrismaClient] Error creating Prisma client:',
          error
        )
        throw new InternalServerError('Failed to connect to database')
      }
    } else {
      console.log('[UserDAO.getPrismaClient] Reusing existing Prisma client.')
    }
    return this.prisma
  }

  private async closePrismaClient() {
    if (this.prisma) {
      console.log('[UserDAO.closePrismaClient] Disconnecting Prisma client.')
      try {
        await this.prisma.$disconnect()
        console.log(
          '[UserDAO.closePrismaClient] Prisma client disconnected successfully.'
        )
      } catch (error) {
        console.error(
          '[UserDAO.closePrismaClient] Error disconnecting Prisma client:',
          error
        )
        throw new InternalServerError('Failed to disconnect from database')
      }
      this.prisma = null
    } else {
      console.log('[UserDAO.closePrismaClient] No Prisma client to disconnect.')
    }
  }

  async getUserById(userId: string) {
    console.log(`[UserDAO.getUserById] Fetching user by ID: ${userId}`)
    const prisma = this.getPrismaClient()
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })
      console.log(
        `[UserDAO.getUserById] User fetched successfully for ID: ${userId}`
      )
      return user
    } catch (error) {
      console.error(
        `[UserDAO.getUserById] Error fetching user by ID ${userId}:`,
        error
      )
      throw new NotFoundError('Failed to get user by ID')
    } finally {
      await this.closePrismaClient()
      console.log(
        `[UserDAO.getUserById] Prisma client closed for ID: ${userId}`
      )
    }
  }

  async getUserByEmail(email: string) {
    console.log(`[UserDAO.getUserByEmail] Fetching user by Email: ${email}`)
    const prisma = this.getPrismaClient()
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      })
      console.log(
        `[UserDAO.getUserByEmail] User fetched successfully for Email: ${email}`
      )
      return user
    } catch (error) {
      console.error(
        `[UserDAO.getUserByEmail] Error fetching user by Email ${email}:`,
        error
      )
      throw new InternalServerError('Failed to get user by email')
    } finally {
      await this.closePrismaClient()
      console.log(
        `[UserDAO.getUserByEmail] Prisma client closed for Email: ${email}`
      )
    }
  }

  async getAllUsers(limit: number = 10, offset: number = 0) {
    console.log(
      `[UserDAO.getAllUsers] Fetching all users with limit ${limit} and offset ${offset}`
    )
    const prisma = this.getPrismaClient()
    try {
      const users = await prisma.user.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
      })
      console.log(
        `[UserDAO.getAllUsers] Successfully fetched ${users.length} users`
      )
      return users
    } catch (error) {
      console.error('[UserDAO.getAllUsers] Error fetching all users:', error)
      throw new InternalServerError('Failed to get all users')
    } finally {
      await this.closePrismaClient()
      console.log(
        '[UserDAO.getAllUsers] Prisma client closed after fetching all users'
      )
    }
  }

  async createUser(data: { email: string; password: string }) {
    console.log(`[UserDAO.createUser] Creating user with Email: ${data.email}`)
    const prisma = this.getPrismaClient()
    const { email, password } = data
    try {
      const newUser = await prisma.user.create({
        data: { email, password }
      })
      console.log(
        `[UserDAO.createUser] User created successfully with Email: ${email}`
      )
      return newUser
    } catch (error) {
      console.error(
        `[UserDAO.createUser] Error creating user with Email ${email}:`,
        error
      )
      throw new InternalServerError('Failed to create user')
    } finally {
      await this.closePrismaClient()
      console.log(
        `[UserDAO.createUser] Prisma client closed after creating user with Email: ${email}`
      )
    }
  }

  async updateUser(
    userId: string,
    data: {
      name?: string
      age?: number
      gender?: string
      avatar?: string
    }
  ) {
    console.log(`[UserDAO.updateUser] Updating user: ${userId}`)
    const prisma = this.getPrismaClient()
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data
      })
      console.log(`[UserDAO.updateUser] User updated successfully: ${userId}`)
      return updatedUser
    } catch (error) {
      console.error(
        `[UserDAO.updateUser] Error updating user ${userId}:`,
        error
      )
      throw new InternalServerError('Failed to update user')
    } finally {
      await this.closePrismaClient()
      console.log(
        `[UserDAO.updateUser] Prisma client closed after updating user: ${userId}`
      )
    }
  }

  async getUserWithRelations(userId: string) {
    console.log(
      `[UserDAO.getUserWithRelations] Fetching user with relations by ID: ${userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          preferences: true,
          medicalConditions: {
            include: {
              medicalCondition: true
            }
          },
          healthTracking: {
            orderBy: { dateRecorded: 'desc' },
            take: 1
          }
        }
      })
      console.log(
        `[UserDAO.getUserWithRelations] User with relations fetched successfully for ID: ${userId}`
      )
      return user
    } catch (error) {
      console.error(
        `[UserDAO.getUserWithRelations] Error fetching user with relations by ID ${userId}:`,
        error
      )
      throw new NotFoundError('Failed to get user with relations by ID')
    } finally {
      await this.closePrismaClient()
      console.log(
        `[UserDAO.getUserWithRelations] Prisma client closed for ID: ${userId}`
      )
    }
  }

  async createOrUpdateUserPreferences(
    userId: string,
    preferences: {
      language?: string
      theme?: string
      notifications?: boolean
    }
  ) {
    console.log(
      `[UserDAO.createOrUpdateUserPreferences] Updating preferences for user: ${userId}`
    )
    const prisma = this.getPrismaClient()
    try {
      const userPreferences = await prisma.preferences.upsert({
        where: { userId },
        update: preferences,
        create: {
          userId,
          ...preferences
        }
      })
      console.log(
        `[UserDAO.createOrUpdateUserPreferences] User preferences updated successfully for user: ${userId}`
      )
      return userPreferences
    } catch (error) {
      console.error(
        `[UserDAO.createOrUpdateUserPreferences] Error updating preferences for user ${userId}:`,
        error
      )
      throw new InternalServerError('Failed to update user preferences')
    } finally {
      await this.closePrismaClient()
      console.log(
        `[UserDAO.createOrUpdateUserPreferences] Prisma client closed for user: ${userId}`
      )
    }
  }
}

export default UserDAO

