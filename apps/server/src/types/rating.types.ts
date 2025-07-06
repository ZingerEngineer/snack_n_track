// Rating and feedback types
// This file contains types specifically for user ratings and app feedback

export enum TRatingType {
  APP_OVERALL = 'APP_OVERALL',
  MEAL_RECOMMENDATION = 'MEAL_RECOMMENDATION',
  FOOD_RECOGNITION = 'FOOD_RECOGNITION',
  NUTRITION_ACCURACY = 'NUTRITION_ACCURACY',
  USER_EXPERIENCE = 'USER_EXPERIENCE',
  FEATURE_SPECIFIC = 'FEATURE_SPECIFIC'
}

export enum TRatingScale {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE'
}

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

