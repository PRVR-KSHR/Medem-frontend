import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'
import styles from './LanguageSelector.module.css'

export default function LanguageSelector({ variant = 'default' }) {
  const { i18n } = useTranslation()

  const currentLang = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().startsWith('hi')
    ? 'hi'
    : 'en'

  const nextLang = currentLang === 'en' ? 'hi' : 'en'

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        className={`${styles.selector} ${styles.mobileSelector}`}
        onClick={() => i18n.changeLanguage(nextLang)}
      >
        <span className={styles.label}>
          {currentLang === 'en' ? 'हिंदी' : 'English'}
        </span>
        <span className={styles.iconBadge} aria-hidden="true">
          <Languages className={styles.icon} />
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      className={styles.selector}
      onClick={() => i18n.changeLanguage(nextLang)}
      aria-label={currentLang === 'en' ? 'Switch language to Hindi' : 'Switch language to English'}
      title={currentLang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    >
      <span className={styles.label}>
        {currentLang === 'en' ? 'हिंदी' : 'English'}
      </span>
      <span className={styles.iconBadge} aria-hidden="true">
        <Languages className={styles.icon} />
      </span>
    </button>
  )
}
