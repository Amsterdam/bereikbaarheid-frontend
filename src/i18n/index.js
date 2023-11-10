import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const LANGUAGES = ['nl', 'en', 'de', 'es']

i18n.use(initReactI18next).init({
  fallbackLng: 'nl',
  lng: 'nl',
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
})

i18n.languages = LANGUAGES

export default i18n
