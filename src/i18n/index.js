import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const LANGUAGES = ['nl', 'en', 'de', 'es', 'fr']

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'nl',
    resources: LANGUAGES.reduce((acc, cur) => {
      let translations

      try {
        translations = require(`./locales/${cur}/translations.json`)
      } catch (error) {
        console.error(`Could not load translations for language "${cur}". Does the file exist?`, error)
      }

      if (!translations) return acc

      return {
        ...acc,
        [cur]: {
          translations,
        },
      }
    }, {}),
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },

    // Language detection options
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'],
  })

i18n.languages = LANGUAGES

export default i18n
