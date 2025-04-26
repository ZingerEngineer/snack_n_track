// src/stores/language.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '../main'
import PreferencesService from '../apis/mobile/usePreferences'
import { getDeviceLocale } from '../apis/mobile/getDeviceLocale'
import { z } from 'zod'

const LocaleSchema = z.enum(['en', 'ar'])

export const useLanguageStore = defineStore('language', () => {
  // Reactive state for the current locale

  const currentLocale = ref<'en' | 'ar'>(LocaleSchema.parse(i18n.global.locale))

  // Set the locale both in state, i18n and persist it in storage
  const setLocale = async (locale: 'en' | 'ar'): Promise<void> => {
    LocaleSchema.parse(locale) // Validate the locale
    currentLocale.value = locale
    i18n.global.locale = locale
    await PreferencesService.setItem('language', locale)
  }

  // Load the locale from storage if exists, then update store
  const loadLocale = async (): Promise<void> => {
    const { value: savedLocale } = await PreferencesService.getItem('language')
    if (savedLocale) {
      const validatedLocale = LocaleSchema.parse(savedLocale) // Validate the saved locale
      await setLocale(validatedLocale)
    }
  }

  // Adjust language using device locale if no saved preference is found
  const initializeLanguage = async (): Promise<void> => {
    const { value: savedLocale } = await PreferencesService.getItem('language')
    if (!savedLocale) {
      const deviceLocale = await getDeviceLocale()
      const validatedLocale = LocaleSchema.parse(deviceLocale) // Validate the device locale
      await setLocale(validatedLocale)
    }
  }

  return { currentLocale, setLocale, loadLocale, initializeLanguage }
})
