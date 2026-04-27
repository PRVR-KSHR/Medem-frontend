import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { hydrateLanguageFromEnglish } from './indicTransRuntime.js'

import enTranslations from './locales/en.json'
import hiTranslations from './locales/hi.json'
import bnTranslations from './locales/bn.json'

const resources = {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations },
  bn: { translation: bnTranslations },
  ta: { translation: {} },
  te: { translation: {} },
  kn: { translation: {} },
  ml: { translation: {} },
  gu: { translation: {} },
  pa: { translation: {} },
  mr: { translation: {} },
  od: { translation: {} },
  as: { translation: {} }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'bn', 'ta', 'te', 'kn', 'ml', 'gu', 'pa', 'mr', 'od', 'as'],
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

i18n.on('languageChanged', (lang) => {
  hydrateLanguageFromEnglish(i18n, lang).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('IndicTrans2 hydration failed:', err)
  })
})

export default i18n
