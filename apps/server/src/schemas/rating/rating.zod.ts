import { z } from 'zod'
import { RatingType, RatingScale } from '../../types/rating/rating.types'

// Rating System Schemas
export const RatingTypeSchema = z.nativeEnum(RatingType)
export const RatingScaleSchema = z.nativeEnum(RatingScale)

// UserRating Schemas
export const CreateUserRatingSchema = z.object({
  ratingType: RatingTypeSchema,
  rating: RatingScaleSchema,
  comment: z.string().max(1000).optional(),
  context: z.record(z.any()).optional()
})

export const UpdateUserRatingSchema = z.object({
  rating: RatingScaleSchema.optional(),
  comment: z.string().max(1000).optional(),
  context: z.record(z.any()).optional()
})

export const UserRatingQuerySchema = z.object({
  ratingType: RatingTypeSchema.optional(),
  rating: RatingScaleSchema.optional(),
  userId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10)
})

// AppFeedback Schemas
export const FeedbackTypeSchema = z.enum([
  'bug',
  'feature_request',
  'improvement',
  'compliment'
])
export const FeedbackPrioritySchema = z.enum([
  'low',
  'medium',
  'high',
  'critical'
])
export const FeedbackStatusSchema = z.enum([
  'open',
  'in_progress',
  'resolved',
  'closed'
])
export const FeedbackCategorySchema = z.enum([
  'ui',
  'performance',
  'accuracy',
  'functionality'
])

export const CreateAppFeedbackSchema = z.object({
  feedbackType: FeedbackTypeSchema,
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  priority: FeedbackPrioritySchema.default('medium'),
  category: FeedbackCategorySchema.optional(),
  reproducible: z.boolean().default(false),
  deviceInfo: z.record(z.any()).optional(),
  appVersion: z.string().max(50).optional(),
  attachments: z.array(z.string().url()).max(5).default([])
})

export const UpdateAppFeedbackSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).max(5000).optional(),
  priority: FeedbackPrioritySchema.optional(),
  status: FeedbackStatusSchema.optional(),
  category: FeedbackCategorySchema.optional(),
  reproducible: z.boolean().optional(),
  deviceInfo: z.record(z.any()).optional(),
  appVersion: z.string().max(50).optional(),
  attachments: z.array(z.string().url()).max(5).optional(),
  adminResponse: z.string().max(2000).optional(),
  adminRespondedBy: z.string().uuid().optional()
})

export const AppFeedbackQuerySchema = z.object({
  feedbackType: FeedbackTypeSchema.optional(),
  status: FeedbackStatusSchema.optional(),
  priority: FeedbackPrioritySchema.optional(),
  category: FeedbackCategorySchema.optional(),
  userId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10)
})

// FeatureUsageAnalytics Schemas
export const FeatureNameSchema = z.enum([
  'meal_scan',
  'manual_entry',
  'nutrition_view',
  'progress_tracking',
  'recipe_search',
  'meal_planning',
  'food_diary',
  'barcode_scan',
  'photo_recognition',
  'calorie_calculator',
  'macro_tracking',
  'water_intake',
  'weight_tracking',
  'exercise_log',
  'social_sharing',
  'notifications',
  'settings',
  'profile_management',
  'reports_analytics',
  'meal_recommendations'
])

export const ActionSchema = z.enum([
  'view',
  'create',
  'update',
  'delete',
  'share',
  'search',
  'scan',
  'upload',
  'download',
  'export',
  'import',
  'navigate',
  'interact',
  'error'
])

export const CreateFeatureUsageAnalyticsSchema = z.object({
  featureName: FeatureNameSchema,
  action: ActionSchema,
  sessionId: z.string().uuid().optional(),
  duration: z.number().int().min(0).optional(),
  success: z.boolean().default(true),
  errorCode: z.string().max(100).optional(),
  metadata: z.record(z.any()).optional()
})

export const AnalyticsQuerySchema = z.object({
  featureName: FeatureNameSchema.optional(),
  action: ActionSchema.optional(),
  userId: z.string().uuid().optional(),
  success: z.boolean().optional(),
  sessionId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10)
})

// Bulk Operations
export const BulkCreateAnalyticsSchema = z.object({
  analytics: z.array(CreateFeatureUsageAnalyticsSchema).min(1).max(100)
})

// Statistics Queries
export const RatingStatsQuerySchema = z.object({
  ratingType: RatingTypeSchema.optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional()
})

export const FeatureUsageStatsQuerySchema = z.object({
  featureName: FeatureNameSchema.optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  groupBy: z.enum(['day', 'week', 'month']).default('day')
})

export const FeedbackStatsQuerySchema = z.object({
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  groupBy: z.enum(['type', 'status', 'priority', 'category']).default('type')
})

// Export all schemas
export const RatingSchemas = {
  CreateUserRating: CreateUserRatingSchema,
  UpdateUserRating: UpdateUserRatingSchema,
  UserRatingQuery: UserRatingQuerySchema,
  RatingStatsQuery: RatingStatsQuerySchema
}

export const FeedbackSchemas = {
  CreateAppFeedback: CreateAppFeedbackSchema,
  UpdateAppFeedback: UpdateAppFeedbackSchema,
  AppFeedbackQuery: AppFeedbackQuerySchema,
  FeedbackStatsQuery: FeedbackStatsQuerySchema
}

export const AnalyticsSchemas = {
  CreateFeatureUsageAnalytics: CreateFeatureUsageAnalyticsSchema,
  BulkCreateAnalytics: BulkCreateAnalyticsSchema,
  AnalyticsQuery: AnalyticsQuerySchema,
  FeatureUsageStatsQuery: FeatureUsageStatsQuerySchema
}

