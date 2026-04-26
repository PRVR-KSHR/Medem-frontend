import { useTranslation } from 'react-i18next'
import styles from './LanguageSelector.module.css'

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  const currentLang = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().startsWith('hi')
    ? 'hi'
    : 'en'

  const nextLang = currentLang === 'en' ? 'hi' : 'en'

  return (
    <button
      type="button"
      className={styles.selector}
      onClick={() => i18n.changeLanguage(nextLang)}
      aria-label={currentLang === 'en' ? 'Switch language to Hindi' : 'Switch language to English'}
      title={currentLang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    >
      <span className={styles.current}>
        {currentLang === 'en' ? 'हिंदी' : 'English'}
      </span>
    </button>
  )
}
