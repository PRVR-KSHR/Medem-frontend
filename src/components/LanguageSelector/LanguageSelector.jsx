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
        className="bg-[#212121] w-full text-[#E1E0CC] rounded-full flex justify-between items-center pl-6 pr-2 py-2 font-medium text-sm border border-[#DEDBC8]/10 group hover:bg-[#2a2a2a] transition-all"
        onClick={() => i18n.changeLanguage(nextLang)}
      >
        <span className="flex items-center gap-2">
          {currentLang === 'en' ? 'हिंदी' : 'English'}
        </span>
        <div className="bg-[#DEDBC8]/10 rounded-full w-8 h-8 ml-4 flex items-center justify-center shrink-0">
          <Languages className="w-4 h-4 text-[#DEDBC8]" />
        </div>
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
      <span className={styles.current}>
        {currentLang === 'en' ? 'हिंदी' : 'English'}
      </span>
    </button>
  )
}
