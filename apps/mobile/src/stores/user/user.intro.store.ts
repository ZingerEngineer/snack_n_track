import { defineStore } from 'pinia'
import { ref } from 'vue'

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

  // Setters
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

  return {
    userIntro,
    setLanguage,
    setAge,
    setWeight,
    setHeight,
    setDietaryRestrictions,
    setHealthConditions,
    setFoodPreferences,
    setFoodAllergies,
    getLanguage,
    getAge,
    getWeight,
    getHeight,
    getHealthConditions,
    getDietaryRestrictions,
    getFoodPreferences,
    getFoodAllergies,
    getUserIntro,
  }
})
