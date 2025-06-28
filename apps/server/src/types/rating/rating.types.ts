import { RatingType, RatingScale } from '@prisma/client'

// Re-export Prisma enums for convenience
export { RatingType, RatingScale } from '@prisma/client'

// UserRating Types
export interface UserRatingBase {
  id: string
  userId: string
  ratingType: RatingType
  rating: RatingScale
  comment?: string | null
  context?: any // JSON field
  createdAt: Date
  updatedAt?: Date | null
}

export interface CreateUserRatingRequest {
  ratingType: RatingType
  rating: RatingScale
  comment?: string
  context?: any
}

export interface UpdateUserRatingRequest {
  rating?: RatingScale
  comment?: string
  context?: any
}

export interface UserRatingWithUser extends UserRatingBase {
  user: {
    id: string
    name?: string | null
    email: string
  }
}

// AppFeedback Types
export interface AppFeedbackBase {
  id: string
  userId?: string | null
  feedbackType: string
  title: string
  description: string
  priority: string
  status: string
  category?: string | null
  reproducible: boolean
  deviceInfo?: any // JSON field
  appVersion?: string | null
  attachments: string[]
  adminResponse?: string | null
  adminRespondedAt?: Date | null
  adminRespondedBy?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export interface CreateAppFeedbackRequest {
  feedbackType: string
  title: string
  description: string
  priority?: string
  category?: string
  reproducible?: boolean
  deviceInfo?: any
  appVersion?: string
  attachments?: string[]
}

export interface UpdateAppFeedbackRequest {
  title?: string
  description?: string
  priority?: string
  status?: string
  category?: string
  reproducible?: boolean
  deviceInfo?: any
  appVersion?: string
  attachments?: string[]
  adminResponse?: string
  adminRespondedBy?: string
}

export interface AppFeedbackWithUser extends AppFeedbackBase {
  user?: {
    id: string
    name?: string | null
    email: string
  } | null
}

// FeatureUsageAnalytics Types
export interface FeatureUsageAnalyticsBase {
  id: string
  userId?: string | null
  featureName: string
  action: string
  sessionId?: string | null
  duration?: number | null
  success: boolean
  errorCode?: string | null
  metadata?: any // JSON field
  timestamp: Date
}

export interface CreateFeatureUsageAnalyticsRequest {
  featureName: string
  action: string
  sessionId?: string
  duration?: number
  success?: boolean
  errorCode?: string
  metadata?: any
}

export interface FeatureUsageAnalyticsWithUser
  extends FeatureUsageAnalyticsBase {
  user?: {
    id: string
    name?: string | null
    email: string
  } | null
}

// Aggregated Analytics Types
export interface FeatureUsageStats {
  featureName: string
  totalUsage: number
  successRate: number
  averageDuration?: number
  uniqueUsers: number
}

export interface RatingStats {
  ratingType: RatingType
  averageRating: number
  totalRatings: number
  distribution: Record<RatingScale, number>
}

export interface FeedbackStats {
  totalFeedback: number
  byType: Record<string, number>
  byStatus: Record<string, number>
  byPriority: Record<string, number>
}

// Search and Filter Types
export interface RatingFilters {
  ratingType?: RatingType
  rating?: RatingScale
  userId?: string
  dateFrom?: Date
  dateTo?: Date
}

export interface FeedbackFilters {
  feedbackType?: string
  status?: string
  priority?: string
  category?: string
  userId?: string
  dateFrom?: Date
  dateTo?: Date
}

export interface AnalyticsFilters {
  featureName?: string
  action?: string
  userId?: string
  success?: boolean
  dateFrom?: Date
  dateTo?: Date
}

// Response Types
export interface PaginatedRatings {
  ratings: UserRatingWithUser[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PaginatedFeedback {
  feedback: AppFeedbackWithUser[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PaginatedAnalytics {
  analytics: FeatureUsageAnalyticsWithUser[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

