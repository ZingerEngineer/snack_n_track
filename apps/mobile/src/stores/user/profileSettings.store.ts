import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import type {
  UserSettingsResponse,
  HealthConditionResponse,
} from '../../types/user/user.intro.types'
import type { HealthCondition } from '../../statics/user/userIntro/healthConditions'
import fetcher from '../../utils/server/fetcher'

// Profile Settings specific types
export interface ProfileData {
  email: string
  password: string
  name?: string
  profileImage: string
}

export interface HealthInfo {
  height: number
  weight: number
  age: number
  activityLevel: string
  BMI?: number
  sugarLevel?: number
  bloodPressure?: string
  cholesterolLevel?: number
  dietaryPreference?: string
}

export interface DietaryPreferences {
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  dairyFree: boolean
  lowSodium: boolean
}

export interface NotificationSettings {
  mealReminders: boolean
  healthTips: boolean
  weeklyReports: boolean
}

export interface EditModeState {
  profile: boolean
  health: boolean
  conditions: boolean
  dietary: boolean
}

export const useProfileSettingsStore = defineStore('profileSettings', () => {
  // ========== STATE ==========

  // User profile data
  const userProfile = reactive<ProfileData>({
    email: '',
    password: '',
    name: '',
    profileImage: '',
  })

  // Health information
  const healthInfo = reactive<HealthInfo>({
    height: 0,
    weight: 0,
    age: 0,
    activityLevel: 'moderate',
    BMI: undefined,
    sugarLevel: undefined,
    bloodPressure: undefined,
    cholesterolLevel: undefined,
    dietaryPreference: undefined,
  })

  // Health conditions
  const healthConditions = ref<string[]>([])
  const availableMedicalConditions = ref<HealthCondition[]>([])

  // Dietary preferences
  const dietaryPrefs = reactive<DietaryPreferences>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    lowSodium: false,
  })

  // Notification settings
  const notifications = reactive<NotificationSettings>({
    mealReminders: true,
    healthTips: true,
    weeklyReports: false,
  })

  // Edit modes
  const editMode = reactive<EditModeState>({
    profile: false,
    health: false,
    conditions: false,
    dietary: false,
  })

  // Backup data for cancel functionality
  const backupData = reactive({
    profile: {} as ProfileData,
    health: {} as HealthInfo,
    conditions: [] as string[],
    dietary: {} as DietaryPreferences,
  })

  // Loading and error states
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isInitialized = ref(false)

  // ========== COMPUTED VALUES ==========

  const hasUnsavedChanges = computed(() => {
    return editMode.profile || editMode.health || editMode.conditions || editMode.dietary
  })

  const formattedHealthConditions = computed(() => {
    return healthConditions.value.map((conditionName) => {
      const condition = availableMedicalConditions.value.find(
        (c) => c.value === conditionName || c.label === conditionName,
      )
      return condition ? condition.label : conditionName
    })
  })

  const BMI = computed(() => {
    if (healthInfo.height > 0 && healthInfo.weight > 0) {
      const heightInMeters = healthInfo.height / 100
      return Math.round((healthInfo.weight / (heightInMeters * heightInMeters)) * 10) / 10
    }
    return undefined
  })

  // ========== API ACTIONS ==========

  /**
   * Initialize the store by loading user settings from the backend
   */
  const initializeStore = async (): Promise<void> => {
    if (isInitialized.value) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      // Load user settings and available medical conditions in parallel
      await Promise.all([loadUserSettings(), loadAvailableMedicalConditions()])

      isInitialized.value = true
      console.log('[ProfileSettingsStore] Store initialized successfully')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to initialize profile settings'
      console.error('[ProfileSettingsStore] Initialization error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Load user settings from the backend
   */
  const loadUserSettings = async (): Promise<void> => {
    try {
      console.log('[ProfileSettingsStore] Loading user settings...')
      const response: UserSettingsResponse = await fetcher('private/settings/')

      if (response.success && response.data) {
        // Map backend data to store state
        const { profile, healthData, preferences, medicalConditions } = response.data

        // Update profile data
        Object.assign(userProfile, {
          email: profile.email,
          name: profile.name || '',
          profileImage: profile.avatar || '',
          password: '', // Never populate password from backend
        })

        // Update health data
        Object.assign(healthInfo, {
          height: healthData.height?.value || 0,
          weight: healthData.weight?.value || 0,
          age: profile.age || 0,
          activityLevel: healthData.activityLevel || 'moderate',
          BMI: healthData.BMI,
          sugarLevel: healthData.sugarLevel,
          bloodPressure: healthData.bloodPressure,
          cholesterolLevel: healthData.cholesterolLevel,
          dietaryPreference: healthData.dietaryPreference,
        })

        // Update health conditions
        healthConditions.value = medicalConditions.map((condition) => condition.value)

        // Update notification preferences
        Object.assign(notifications, {
          mealReminders: preferences.notifications ?? true,
          healthTips: preferences.notifications ?? true,
          weeklyReports: preferences.notifications ?? false,
        })

        console.log('[ProfileSettingsStore] User settings loaded successfully')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load user settings'
      throw err
    }
  }

  /**
   * Load available medical conditions
   */
  const loadAvailableMedicalConditions = async (): Promise<void> => {
    try {
      console.log('[ProfileSettingsStore] Loading medical conditions...')
      const response: HealthConditionResponse = await fetcher('private/settings/medical-conditions')
      console.log('[ProfileSettingsStore] Medical conditions response:', response)
      if (response.success) {
        availableMedicalConditions.value = response.data
        console.log('[ProfileSettingsStore] Medical conditions loaded successfully')
      }
    } catch (err) {
      console.error('[ProfileSettingsStore] Failed to load medical conditions:', err)
      // Don't throw here as this is not critical for basic functionality
    }
  }

  // ========== EDIT MODE MANAGEMENT ==========

  /**
   * Toggle edit mode for a specific section
   */
  const toggleEdit = (section: keyof EditModeState): void => {
    editMode[section] = true

    // Create backup for cancel functionality
    switch (section) {
      case 'profile':
        backupData.profile = { ...userProfile }
        break
      case 'health':
        backupData.health = { ...healthInfo }
        break
      case 'conditions':
        backupData.conditions = [...healthConditions.value]
        break
      case 'dietary':
        backupData.dietary = { ...dietaryPrefs }
        break
    }

    console.log(`[ProfileSettingsStore] Edit mode enabled for ${section}`)
  }

  /**
   * Cancel edit mode and restore backup data
   */
  const cancelEdit = (section: keyof EditModeState): void => {
    editMode[section] = false

    // Restore backup data
    switch (section) {
      case 'profile':
        Object.assign(userProfile, backupData.profile)
        break
      case 'health':
        Object.assign(healthInfo, backupData.health)
        break
      case 'conditions':
        healthConditions.value = [...backupData.conditions]
        break
      case 'dietary':
        Object.assign(dietaryPrefs, backupData.dietary)
        break
    }

    console.log(`[ProfileSettingsStore] Edit mode cancelled for ${section}`)
  }

  // ========== SAVE ACTIONS ==========

  /**
   * Save profile information
   */
  const saveProfile = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      console.log('[ProfileSettingsStore] Saving profile...')

      await fetcher('private/settings/profile', {
        method: 'PUT',
        body: JSON.stringify({
          name: userProfile.name,
          email: userProfile.email,
          avatar: userProfile.profileImage,
        }),
      })

      editMode.profile = false
      console.log('[ProfileSettingsStore] Profile saved successfully')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save profile'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Save health information
   */
  const saveHealthInfo = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      console.log('[ProfileSettingsStore] Saving health info...')

      await fetcher('private/settings/health', {
        method: 'PUT',
        body: JSON.stringify({
          weight: { value: healthInfo.weight, unit: 'kg' },
          height: { value: healthInfo.height, unit: 'cm' },
          BMI: BMI.value,
          sugarLevel: healthInfo.sugarLevel,
          bloodPressure: healthInfo.bloodPressure,
          cholesterolLevel: healthInfo.cholesterolLevel,
          activityLevel: healthInfo.activityLevel,
          dietaryPreference: healthInfo.dietaryPreference,
        }),
      })

      // Also update age in profile if changed
      await fetcher('private/settings/profile', {
        method: 'PUT',
        body: JSON.stringify({
          age: healthInfo.age,
        }),
      })

      editMode.health = false
      console.log('[ProfileSettingsStore] Health info saved successfully')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save health information'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Save health conditions
   */
  const saveConditions = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      console.log('[ProfileSettingsStore] Saving health conditions...')

      // Map condition names to values for backend
      const conditionValues = healthConditions.value
        .map((conditionName) => {
          const condition = availableMedicalConditions.value.find(
            (c) => c.value === conditionName || c.label === conditionName,
          )
          return condition?.value || conditionName
        })
        .filter(Boolean)

      await fetcher('private/settings/medical-conditions', {
        method: 'PUT',
        contentType: 'application/json',
        body: {
          medicalConditionIds: conditionValues,
        },
      })

      editMode.conditions = false
      console.log('[ProfileSettingsStore] Health conditions saved successfully')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save health conditions'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Save dietary preferences
   */
  const saveDietaryPrefs = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      console.log('[ProfileSettingsStore] Saving dietary preferences...')

      // Convert dietary preferences to a string format for the backend
      const preferences = []
      if (dietaryPrefs.vegetarian) preferences.push('vegetarian')
      if (dietaryPrefs.vegan) preferences.push('vegan')
      if (dietaryPrefs.glutenFree) preferences.push('gluten-free')
      if (dietaryPrefs.dairyFree) preferences.push('dairy-free')
      if (dietaryPrefs.lowSodium) preferences.push('low-sodium')

      await fetcher('private/settings/health', {
        method: 'PUT',
        body: JSON.stringify({
          dietaryPreference: preferences.join(', ') || 'none',
        }),
      })

      editMode.dietary = false
      console.log('[ProfileSettingsStore] Dietary preferences saved successfully')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save dietary preferences'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Save notification preferences
   */
  const saveNotifications = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      console.log('[ProfileSettingsStore] Saving notification preferences...')

      await fetcher('private/settings/preferences', {
        method: 'PUT',
        body: JSON.stringify({
          notifications:
            notifications.mealReminders || notifications.healthTips || notifications.weeklyReports,
        }),
      })

      console.log('[ProfileSettingsStore] Notification preferences saved successfully')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save notification preferences'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // ========== HEALTH CONDITIONS MANAGEMENT ==========

  /**
   * Add a new health condition
   */
  const addCondition = (conditionName: string): void => {
    const trimmedCondition = conditionName.trim()
    if (trimmedCondition && !healthConditions.value.includes(trimmedCondition)) {
      healthConditions.value.push(trimmedCondition)
      console.log('[ProfileSettingsStore] Added condition:', trimmedCondition)
    }
  }

  /**
   * Remove a health condition by index
   */
  const removeCondition = (index: number): void => {
    if (index >= 0 && index < healthConditions.value.length) {
      const removed = healthConditions.value.splice(index, 1)[0]
      console.log('[ProfileSettingsStore] Removed condition:', removed)
    }
  }

  /**
   * Add a common condition
   */
  const addCommonCondition = (condition: string): void => {
    addCondition(condition)
  }

  // ========== UTILITY METHODS ==========

  /**
   * Reset all data to default values
   */
  const resetStore = (): void => {
    Object.assign(userProfile, {
      email: '',
      password: '',
      name: '',
      profileImage: '',
    })

    Object.assign(healthInfo, {
      height: 0,
      weight: 0,
      age: 0,
      activityLevel: 'moderate',
      BMI: undefined,
      sugarLevel: undefined,
      bloodPressure: undefined,
      cholesterolLevel: undefined,
      dietaryPreference: undefined,
    })

    healthConditions.value = []

    Object.assign(dietaryPrefs, {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      lowSodium: false,
    })

    Object.assign(notifications, {
      mealReminders: true,
      healthTips: true,
      weeklyReports: false,
    })

    Object.assign(editMode, {
      profile: false,
      health: false,
      conditions: false,
      dietary: false,
    })

    isInitialized.value = false
    error.value = null

    console.log('[ProfileSettingsStore] Store reset')
  }

  /**
   * Refresh all data from the backend
   */
  const refreshData = async (): Promise<void> => {
    await loadUserSettings()
    await loadAvailableMedicalConditions()
  }

  // ========== RETURN STORE API ==========

  return {
    // State
    userProfile,
    healthInfo,
    healthConditions,
    availableMedicalConditions,
    dietaryPrefs,
    notifications,
    editMode,
    isLoading,
    error,
    isInitialized,

    // Computed
    hasUnsavedChanges,
    formattedHealthConditions,
    BMI,

    // Initialization
    initializeStore,
    resetStore,
    refreshData,

    // Data loading
    loadUserSettings,
    loadAvailableMedicalConditions,

    // Edit mode management
    toggleEdit,
    cancelEdit,

    // Save operations
    saveProfile,
    saveHealthInfo,
    saveConditions,
    saveDietaryPrefs,
    saveNotifications,

    // Health conditions management
    addCondition,
    removeCondition,
    addCommonCondition,
  }
})
