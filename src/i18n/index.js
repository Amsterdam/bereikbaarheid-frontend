import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const LANGUAGES = ['nl', 'en', 'de', 'es', 'fr']

async function loadTranslations() {
  const resources = {}

  for (const lang of LANGUAGES) {
    const translations = await import(`./locales/${lang}/translations.json`)
    resources[lang] = {
      translations: translations.default || translations
    }
  }

  return resources
}

async function initI18n() {
  const resources = await loadTranslations()

  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'nl',
      resources,
      ns: ['translations'],
      defaultNS: 'translations',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        lookupSessionStorage: 'i18nextLng',
        caches: ['localStorage'],
        excludeCacheFor: ['cimode'],
      }
    })
  return i18n
}

await initI18n()

i18n.languages = LANGUAGES

export { LANGUAGES }
export default i18n
