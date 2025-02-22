import { PrismaClient } from '@prisma/client'
import { InternalServerError, NotFoundError } from '../classes/Error'

class UserDAO {
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

  async getUserById(userId: string) {
    const prisma = this.getPrismaClient()
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })
      return user
    } catch (error) {
      throw new NotFoundError('Failed to get user by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getUserByGoogleId(googleId: string) {
    const prisma = this.getPrismaClient()
    try {
      const user = await prisma.user.findUnique({
        where: { googleId: googleId }
      })
      return user
    } catch (error) {
      throw new NotFoundError('Failed to get user by ID')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getUserByEmail(email: string) {
    const prisma = this.getPrismaClient()
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      })
      return user
    } catch (error) {
      throw new InternalServerError('Failed to get user by email')
    } finally {
      await this.closePrismaClient()
    }
  }

  async getAllUsers(limit: number = 10, offset: number = 0) {
    const prisma = this.getPrismaClient()
    try {
      const users = await prisma.user.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
      })
      return users
    } catch (error) {
      throw new InternalServerError('Failed to get all users')
    } finally {
      await this.closePrismaClient()
    }
  }

  async createUser(data: { email: string; password: string }) {
    const prisma = this.getPrismaClient()
    const { email, password } = data
    try {
      const newUser = await prisma.user.create({
        data: { email, password }
      })
      return newUser
    } catch (error) {
      throw new InternalServerError('Failed to create user')
    } finally {
      await this.closePrismaClient()
    }
  }
}

export default UserDAO

