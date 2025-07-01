import { Device } from '@capacitor/device'
import { isPlatform } from '@ionic/vue'

// Supported locales in the app
export type TSupportedLocale = 'en' | 'ar'

// Extended locale information
export interface ILocaleInfo {
  code: TSupportedLocale
  language: string
  region?: string
  isRTL: boolean
  displayName: string
  nativeName: string
}

// Locale mapping and fallback logic
const LOCALE_MAP: Record<string, TSupportedLocale> = {
  // English variants
  en: 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'en-CA': 'en',
  'en-AU': 'en',
  'en-NZ': 'en',
  'en-ZA': 'en',

  // Arabic variants
  ar: 'ar',
  'ar-SA': 'ar',
  'ar-EG': 'ar',
  'ar-AE': 'ar',
  'ar-QA': 'ar',
  'ar-KW': 'ar',
  'ar-BH': 'ar',
  'ar-OM': 'ar',
  'ar-JO': 'ar',
  'ar-LB': 'ar',
  'ar-SY': 'ar',
  'ar-IQ': 'ar',
  'ar-LY': 'ar',
  'ar-MA': 'ar',
  'ar-TN': 'ar',
  'ar-DZ': 'ar',
  'ar-SD': 'ar',
  'ar-YE': 'ar',
}

const LOCALE_INFO: Record<TSupportedLocale, ILocaleInfo> = {
  en: {
    code: 'en',
    language: 'English',
    region: 'US',
    isRTL: false,
    displayName: 'English',
    nativeName: 'English',
  },
  ar: {
    code: 'ar',
    language: 'Arabic',
    region: 'SA',
    isRTL: true,
    displayName: 'Arabic',
    nativeName: 'العربية',
  },
}

const DEFAULT_LOCALE: TSupportedLocale = 'en'

export class LocaleError extends Error {
  constructor(
    message: string,
    public originalError?: unknown,
  ) {
    super(message)
    this.name = 'LocaleError'
  }
}

/**
 * Get the device's language code and map it to a supported locale
 * @returns Promise<TSupportedLocale> - Supported locale code
 */
export const getDeviceLocale = async (): Promise<TSupportedLocale> => {
  try {
    // Check if running on a device with Capacitor
    if (!isPlatform('capacitor') && !isPlatform('hybrid')) {
      // Fallback to browser locale
      const browserLocale = getBrowserLocale()
      return mapToSupportedLocale(browserLocale)
    }

    const result = await Device.getLanguageCode()
    const deviceLocale = result.value

    if (!deviceLocale) {
      console.warn('Device locale not available, using default locale')
      return DEFAULT_LOCALE
    }

    return mapToSupportedLocale(deviceLocale)
  } catch (error) {
    console.error('Error getting device locale:', error)
    throw new LocaleError('Failed to get device locale', error)
  }
}

/**
 * Get browser locale as fallback
 * @returns string - Browser locale code
 */
export const getBrowserLocale = (): string => {
  try {
    // Try multiple browser APIs
    const nav = navigator as Navigator & {
      userLanguage?: string
      browserLanguage?: string
    }

    return (
      navigator.language ||
      navigator.languages?.[0] ||
      nav.userLanguage ||
      nav.browserLanguage ||
      DEFAULT_LOCALE
    )
  } catch (error) {
    console.warn('Could not determine browser locale:', error)
    return DEFAULT_LOCALE
  }
}

/**
 * Map a locale code to a supported locale with fallback logic
 * @param localeCode - Raw locale code from device/browser
 * @returns TSupportedLocale - Mapped supported locale
 */
export const mapToSupportedLocale = (localeCode: string): TSupportedLocale => {
  if (!localeCode) {
    return DEFAULT_LOCALE
  }

  const normalizedCode = localeCode.toLowerCase().trim()

  // Direct match
  if (LOCALE_MAP[normalizedCode]) {
    return LOCALE_MAP[normalizedCode]
  }

  // Try matching just the language part (before the dash)
  const languageCode = normalizedCode.split('-')[0]
  if (LOCALE_MAP[languageCode]) {
    return LOCALE_MAP[languageCode]
  }

  // Fallback to default
  console.warn(`Unsupported locale: ${localeCode}, falling back to ${DEFAULT_LOCALE}`)
  return DEFAULT_LOCALE
}

/**
 * Get detailed locale information
 * @param locale - Locale code (optional, uses device locale if not provided)
 * @returns Promise<ILocaleInfo> - Detailed locale information
 */
export const getLocaleInfo = async (locale?: TSupportedLocale): Promise<ILocaleInfo> => {
  try {
    const targetLocale = locale || (await getDeviceLocale())
    return LOCALE_INFO[targetLocale]
  } catch (error) {
    console.error('Error getting locale info:', error)
    return LOCALE_INFO[DEFAULT_LOCALE]
  }
}

/**
 * Check if a locale is right-to-left (RTL)
 * @param locale - Locale code (optional, uses device locale if not provided)
 * @returns Promise<boolean> - True if RTL, false otherwise
 */
export const isRTLLocale = async (locale?: TSupportedLocale): Promise<boolean> => {
  try {
    const localeInfo = await getLocaleInfo(locale)
    return localeInfo.isRTL
  } catch (error) {
    console.error('Error checking RTL status:', error)
    return false
  }
}

/**
 * Get all supported locales
 * @returns TSupportedLocale[] - Array of supported locale codes
 */
export const getSupportedLocales = (): TSupportedLocale[] => {
  return Object.keys(LOCALE_INFO) as TSupportedLocale[]
}

/**
 * Get locale display name in the target language
 * @param locale - Target locale
 * @param displayLocale - Locale to display the name in (optional)
 * @returns string - Localized display name
 */
export const getLocaleDisplayName = (
  locale: TSupportedLocale,
  displayLocale?: TSupportedLocale,
): string => {
  const localeInfo = LOCALE_INFO[locale]

  if (!displayLocale || displayLocale === locale) {
    return localeInfo.nativeName
  }

  return localeInfo.displayName
}

/**
 * Detect user's preferred locale with comprehensive fallback
 * This function tries multiple sources in order of preference
 * @returns Promise<TSupportedLocale> - Best guess at user's preferred locale
 */
export const detectUserPreferredLocale = async (): Promise<TSupportedLocale> => {
  try {
    // 1. Try device locale first (most accurate)
    if (isPlatform('capacitor') || isPlatform('hybrid')) {
      return await getDeviceLocale()
    }

    // 2. Try browser locale
    const browserLocale = getBrowserLocale()
    return mapToSupportedLocale(browserLocale)
  } catch (error) {
    console.error('Error detecting user preferred locale:', error)
    return DEFAULT_LOCALE
  }
}

// Legacy export for backward compatibility
export default getDeviceLocale
