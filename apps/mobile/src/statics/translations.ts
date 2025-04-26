const mainLanguage = 'en'

const loginTranslations = {}

const registerTranslations = {}

const introTranslations = {}

export const i18nConfig = {
  locale: mainLanguage,
  fallbackLocale: 'en',
  messages: {
    en: {
      welcome: 'Welcome to the app!',
    },
    ar: {
      welcome: 'مرحبًا بك في التطبيق!',
    },
  },
  introTranslations,
  registerTranslations,
  loginTranslations,
}
