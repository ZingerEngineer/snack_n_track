import { PrismaClient, Prisma, RatingType, RatingScale } from '@prisma/client'
import {
  UserRatingBase,
  CreateUserRatingRequest,
  UpdateUserRatingRequest,
  UserRatingWithUser,
  RatingFilters,
  PaginatedRatings,
  RatingStats
} from '../types/rating/rating.types'

export class UserRatingDAO {
  constructor(private prisma: PrismaClient) {}

  async create(
    userId: string,
    data: CreateUserRatingRequest
  ): Promise<UserRatingBase> {
    const result = await this.prisma.userRating.create({
      data: {
        userId,
        ...data
      }
    })
    return result as UserRatingBase
  }

  async findById(id: string): Promise<UserRatingWithUser | null> {
    const result = await this.prisma.userRating.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    return result as UserRatingWithUser | null
  }

  async findByUserAndType(
    userId: string,
    ratingType: RatingType
  ): Promise<UserRatingBase | null> {
    const result = await this.prisma.userRating.findUnique({
      where: {
        userId_ratingType: {
          userId,
          ratingType
        }
      }
    })
    return result as UserRatingBase | null
  }

  async update(
    id: string,
    data: UpdateUserRatingRequest
  ): Promise<UserRatingBase> {
    const result = await this.prisma.userRating.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
    return result as UserRatingBase
  }

  async upsertByUserAndType(
    userId: string,
    ratingType: RatingType,
    data: Omit<CreateUserRatingRequest, 'ratingType'>
  ): Promise<UserRatingBase> {
    const result = await this.prisma.userRating.upsert({
      where: {
        userId_ratingType: {
          userId,
          ratingType
        }
      },
      update: {
        ...data,
        updatedAt: new Date()
      },
      create: {
        userId,
        ratingType,
        ...data
      }
    })
    return result as UserRatingBase
  }

  async delete(id: string): Promise<UserRatingBase> {
    const result = await this.prisma.userRating.delete({
      where: { id }
    })
    return result as UserRatingBase
  }

  async findMany(
    filters: RatingFilters & { page: number; pageSize: number }
  ): Promise<PaginatedRatings> {
    const { page, pageSize, dateFrom, dateTo, ...whereFilters } = filters

    const where: Prisma.UserRatingWhereInput = {
      ...whereFilters,
      ...(dateFrom || dateTo
        ? {
            createdAt: {
              ...(dateFrom && { gte: dateFrom }),
              ...(dateTo && { lte: dateTo })
            }
          }
        : {})
    }

    const [ratings, totalCount] = await Promise.all([
      this.prisma.userRating.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      this.prisma.userRating.count({ where })
    ])

    return {
      ratings: ratings as UserRatingWithUser[],
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize)
    }
  }

  async getUserRatings(userId: string): Promise<UserRatingBase[]> {
    const result = await this.prisma.userRating.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    return result as UserRatingBase[]
  }

  async getRatingStats(filters?: {
    ratingType?: RatingType
    dateFrom?: Date
    dateTo?: Date
  }): Promise<RatingStats[]> {
    const where: Prisma.UserRatingWhereInput = {
      ...(filters?.ratingType && { ratingType: filters.ratingType }),
      ...(filters?.dateFrom || filters?.dateTo
        ? {
            createdAt: {
              ...(filters.dateFrom && { gte: filters.dateFrom }),
              ...(filters.dateTo && { lte: filters.dateTo })
            }
          }
        : {})
    }

    const ratingTypes = filters?.ratingType
      ? [filters.ratingType]
      : Object.values(RatingType)

    const stats: RatingStats[] = []

    for (const ratingType of ratingTypes) {
      const ratings = await this.prisma.userRating.findMany({
        where: { ...where, ratingType },
        select: { rating: true }
      })

      if (ratings.length === 0) {
        stats.push({
          ratingType: ratingType as RatingType,
          averageRating: 0,
          totalRatings: 0,
          distribution: {
            [RatingScale.ONE]: 0,
            [RatingScale.TWO]: 0,
            [RatingScale.THREE]: 0,
            [RatingScale.FOUR]: 0,
            [RatingScale.FIVE]: 0
          }
        })
        continue
      }

      const ratingValues = ratings.map((r) => {
        switch (r.rating) {
          case RatingScale.ONE:
            return 1
          case RatingScale.TWO:
            return 2
          case RatingScale.THREE:
            return 3
          case RatingScale.FOUR:
            return 4
          case RatingScale.FIVE:
            return 5
          default:
            return 0
        }
      })

      const distribution = {
        [RatingScale.ONE]: ratings.filter((r) => r.rating === RatingScale.ONE)
          .length,
        [RatingScale.TWO]: ratings.filter((r) => r.rating === RatingScale.TWO)
          .length,
        [RatingScale.THREE]: ratings.filter(
          (r) => r.rating === RatingScale.THREE
        ).length,
        [RatingScale.FOUR]: ratings.filter((r) => r.rating === RatingScale.FOUR)
          .length,
        [RatingScale.FIVE]: ratings.filter((r) => r.rating === RatingScale.FIVE)
          .length
      }

      stats.push({
        ratingType: ratingType as RatingType,
        averageRating:
          ratingValues.reduce((sum, val) => sum + val, 0 as number) /
          ratingValues.length,
        totalRatings: ratings.length,
        distribution
      })
    }

    return stats
  }

  async getAverageRatingByType(ratingType: RatingType): Promise<number> {
    const result = await this.prisma.userRating.aggregate({
      where: { ratingType }
    })

    if (!result) {
      return 0
    }

    // Convert enum to numeric value for calculation
    const ratings = await this.prisma.userRating.findMany({
      where: { ratingType },
      select: { rating: true }
    })

    if (ratings.length === 0) {
      return 0
    }

    const numericRatings = ratings.map((r) => {
      switch (r.rating) {
        case RatingScale.ONE:
          return 1
        case RatingScale.TWO:
          return 2
        case RatingScale.THREE:
          return 3
        case RatingScale.FOUR:
          return 4
        case RatingScale.FIVE:
          return 5
        default:
          return 0
      }
    })

    return (
      numericRatings.reduce((sum, val) => sum + val, 0 as number) /
      numericRatings.length
    )
  }
}

