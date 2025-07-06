import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  UserSettingsResponse,
  UserSettingsRequest,
  UserProfile,
  UserHealthData,
  UserPreferences,
  HealthConditionResponse,
} from '../../types/user/user.intro.types'
import type { HealthCondition } from '../../statics/user/userIntro/healthConditions'
import fetcher from '../../utils/server/fetcher'

export type TUserIntro = {
  language: string
  age: number
  weight: {
    value: number
    unit: string
  }
  height: {
    value: number
    unit: string
  }
  healthConditions: string[]
  dietaryRestrictions: string
  foodPreferences: string[]
  foodAllergies: string[]
}

// Extended user settings type that includes backend data
export type TUserSettings = {
  profile: UserProfile
  healthData: UserHealthData
  preferences: UserPreferences
  medicalConditions: HealthCondition[]
}

const defaultUserIntro: TUserIntro = {
  language: 'en',
  age: 0,
  weight: {
    value: 0,
    unit: 'kg',
  },
  height: {
    value: 0,
    unit: 'cm',
  },
  healthConditions: [],
  dietaryRestrictions: 'none',
  foodPreferences: [],
  foodAllergies: [],
}

export const useUserIntroStore = defineStore('userIntro', () => {
  // State
  const userIntro = ref<TUserIntro>(defaultUserIntro)
  const userSettings = ref<TUserSettings | null>(null)
  const availableMedicalConditions = ref<HealthCondition[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // API Actions
  const fetchUserSettings = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const response: UserSettingsResponse = await fetcher('')

      if (response.success && response.data) {
        userSettings.value = response.data

        // Update local userIntro with fetched data
        if (response.data.profile.age) {
          userIntro.value.age = response.data.profile.age
        }

        if (response.data.healthData.weight) {
          userIntro.value.weight = response.data.healthData.weight
        }

        if (response.data.healthData.height) {
          userIntro.value.height = response.data.healthData.height
        }

        if (response.data.preferences.language) {
          userIntro.value.language = response.data.preferences.language
        }

        userIntro.value.healthConditions = response.data.medicalConditions.map(
          (condition) => condition.value,
        )
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user settings'
      console.error('Error fetching user settings:', err)
    } finally {
      isLoading.value = false
    }
  }

  const updateUserSettings = async (updates: UserSettingsRequest): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const response: UserSettingsResponse = await fetcher('', {
        method: 'PUT',
        body: JSON.stringify(updates),
      })

      if (response.success && response.data) {
        userSettings.value = response.data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user settings'
      console.error('Error updating user settings:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateUserProfile = async (profile: Partial<UserProfile>): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      await fetcher('profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      })

      // Refresh user settings
      await fetchUserSettings()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user profile'
      console.error('Error updating user profile:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateUserHealthData = async (healthData: Partial<UserHealthData>): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      await fetcher('health', {
        method: 'PUT',
        body: JSON.stringify(healthData),
      })

      // Refresh user settings
      await fetchUserSettings()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user health data'
      console.error('Error updating user health data:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateUserPreferences = async (preferences: Partial<UserPreferences>): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      await fetcher('preferences', {
        method: 'PUT',
        body: JSON.stringify(preferences),
      })

      // Refresh user settings
      await fetchUserSettings()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user preferences'
      console.error('Error updating user preferences:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateMedicalConditions = async (medicalConditionIds: string[]): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      await fetcher('medical-conditions', {
        method: 'PUT',
        body: JSON.stringify({ medicalConditionIds }),
      })

      // Refresh user settings
      await fetchUserSettings()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update medical conditions'
      console.error('Error updating medical conditions:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchAvailableMedicalConditions = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const response: HealthConditionResponse = await fetcher('medical-conditions')

      if (response.success) {
        availableMedicalConditions.value = response.data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch medical conditions'
      console.error('Error fetching medical conditions:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Local setters (for offline use or before sync)
  const setLanguage = (language: string) => {
    if (userIntro.value) {
      console.log('Setting language:', language)
      userIntro.value.language = language
    }
  }

  const setAge = (age: number) => {
    if (userIntro.value) {
      console.log('Setting age:', age)
      userIntro.value.age = age
    }
  }

  const setWeight = (value: number, unit: string) => {
    if (userIntro.value) {
      console.log('Setting weight:', { value, unit })
      userIntro.value.weight = { value, unit }
    }
  }

  const setHeight = (value: number, unit: string) => {
    if (userIntro.value) {
      console.log('Setting height:', { value, unit })
      userIntro.value.height = { value, unit }
    }
  }

  const setHealthConditions = (healthConditions: string[]) => {
    if (userIntro.value) {
      console.log('Setting health conditions:', healthConditions)
      userIntro.value.healthConditions = healthConditions
    }
  }

  const setDietaryRestrictions = (dietaryRestrictions: string) => {
    if (userIntro.value) {
      console.log('Setting dietary restrictions:', dietaryRestrictions)
      userIntro.value.dietaryRestrictions = dietaryRestrictions
    }
  }

  const setFoodPreferences = (foodPreferences: string[]) => {
    if (userIntro.value) {
      console.log('Setting food preferences:', foodPreferences)
      userIntro.value.foodPreferences = foodPreferences
    }
  }

  const setFoodAllergies = (foodAllergies: string[]) => {
    if (userIntro.value) {
      console.log('Setting food allergies:', foodAllergies)
      userIntro.value.foodAllergies = foodAllergies
    }
  }

  // Getters
  const getLanguage = () => {
    console.log('Getting language:', userIntro.value.language)
    return userIntro.value.language
  }

  const getAge = () => {
    console.log('Getting age:', userIntro.value.age)
    return userIntro.value.age
  }

  const getWeight = () => {
    console.log('Getting weight:', userIntro.value.weight)
    return userIntro.value.weight
  }

  const getHeight = () => {
    console.log('Getting height:', userIntro.value.height)
    return userIntro.value.height
  }

  const getHealthConditions = () => {
    console.log('Getting health conditions:', userIntro.value.healthConditions)
    return userIntro.value.healthConditions
  }

  const getDietaryRestrictions = () => {
    console.log('Getting dietary restrictions:', userIntro.value.dietaryRestrictions)
    return userIntro.value.dietaryRestrictions
  }

  const getFoodPreferences = () => {
    console.log('Getting food preferences:', userIntro.value.foodPreferences)
    return userIntro.value.foodPreferences
  }

  const getFoodAllergies = () => {
    console.log('Getting food allergies:', userIntro.value.foodAllergies)
    return userIntro.value.foodAllergies
  }

  const getUserIntro = () => {
    console.log('Getting user intro:', userIntro.value)
    return userIntro.value
  }

  // Computed values
  const hasUserSettings = computed(() => userSettings.value !== null)
  const currentProfile = computed(() => userSettings.value?.profile)
  const currentHealthData = computed(() => userSettings.value?.healthData)
  const currentPreferences = computed(() => userSettings.value?.preferences)
  const currentMedicalConditions = computed(() => userSettings.value?.medicalConditions || [])

  // Sync local intro with backend on change
  const syncUserIntro = async () => {
    if (!hasUserSettings.value) {
      console.warn('No user settings loaded, skipping sync')
      return
    }

    try {
      await updateUserSettings({
        profile: {
          age: userIntro.value.age,
        },
        healthData: {
          weight: {
            value: userIntro.value.weight.value,
            unit: userIntro.value.weight.unit as 'kg' | 'lb',
          },
          height: {
            value: userIntro.value.height.value,
            unit: userIntro.value.height.unit as 'cm' | 'ft',
          },
        },
        preferences: {
          language: userIntro.value.language,
          theme: currentPreferences.value?.theme || 'light',
          notifications: currentPreferences.value?.notifications || false,
        },
        medicalConditions: userIntro.value.healthConditions,
      })
    } catch (err) {
      console.error('Failed to sync user intro:', err)
    }
  }

  return {
    // State
    userIntro,
    userSettings,
    availableMedicalConditions,
    isLoading,
    error,

    // API Actions
    fetchUserSettings,
    updateUserSettings,
    updateUserProfile,
    updateUserHealthData,
    updateUserPreferences,
    updateMedicalConditions,
    fetchAvailableMedicalConditions,
    syncUserIntro,

    // Local setters
    setLanguage,
    setAge,
    setWeight,
    setHeight,
    setDietaryRestrictions,
    setHealthConditions,
    setFoodPreferences,
    setFoodAllergies,

    // Getters
    getLanguage,
    getAge,
    getWeight,
    getHeight,
    getHealthConditions,
    getDietaryRestrictions,
    getFoodPreferences,
    getFoodAllergies,
    getUserIntro,

    // Computed
    hasUserSettings,
    currentProfile,
    currentHealthData,
    currentPreferences,
    currentMedicalConditions,
  }
})
