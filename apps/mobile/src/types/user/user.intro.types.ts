import type { HealthCondition } from '../../statics/user/userIntro/healthConditions'

export interface UserProfile {
  id: string
  name?: string
  email: string
  age?: number
  gender?: string
  avatar?: string
}

export interface UserHealthData {
  weight?: {
    value: number
    unit: 'kg' | 'lb'
  }
  height?: {
    value: number
    unit: 'cm' | 'ft'
  }
  BMI?: number
  sugarLevel?: number
  bloodPressure?: string
  cholesterolLevel?: number
  dietaryPreference?: string
  activityLevel?: string
}

export interface UserPreferences {
  language: string
  theme: 'light' | 'dark'
  notifications: boolean
}

export interface UserMedicalConditions {
  healthConditions: string[] // Array of condition IDs
}

export interface UserSettingsRequest {
  profile?: Partial<UserProfile>
  healthData?: Partial<UserHealthData>
  preferences?: Partial<UserPreferences>
  medicalConditions?: string[]
}

export interface UserSettingsResponse {
  success: boolean
  message: string
  data?: {
    profile: UserProfile
    healthData: UserHealthData
    preferences: UserPreferences
    medicalConditions: HealthCondition[]
  }
}

export interface HealthConditionResponse {
  success: boolean
  data: HealthCondition[]
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}

export interface CreateUserHealthTrackingRequest {
  weight?: number
  height?: number
  BMI?: number
  sugarLevel?: number
  bloodPressure?: string
  cholesterolLevel?: number
  dietaryPreference?: string
  activityLevel?: string
}
