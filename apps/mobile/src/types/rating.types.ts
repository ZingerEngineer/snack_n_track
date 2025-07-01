// Rating and feedback types
// This file contains types specifically for user ratings and app feedback

export type TRatingType =
  | 'APP_OVERALL'
  | 'MEAL_RECOMMENDATION'
  | 'FOOD_RECOGNITION'
  | 'NUTRITION_ACCURACY'
  | 'USER_EXPERIENCE'
  | 'FEATURE_SPECIFIC'

export type TRatingScale = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'

export interface IUserRating {
  id: string
  userId: string
  ratingType: TRatingType
  rating: TRatingScale
  comment?: string
  context?: Record<string, unknown> // JSON data
  createdAt: Date
  updatedAt?: Date
}
