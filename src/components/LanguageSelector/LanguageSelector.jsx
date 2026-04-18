import { useTranslation } from 'react-i18next'
import styles from './LanguageSelector.module.css'

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' }
  ]

  return (
    <div className={styles.selector}>
      <div className={styles.label}>🌐</div>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className={styles.select}
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
