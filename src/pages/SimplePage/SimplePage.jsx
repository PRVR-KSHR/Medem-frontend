import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './SimplePage.module.css'

export default function SimplePage({ title, hashFallback }) {
  const { t } = useTranslation()

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.h1}>{title}</h1>
        <p className={styles.p}>
          {t('simplePage.description')}
        </p>
        <Link to={`/#${hashFallback}`} className={styles.link}>
          {t('simplePage.goToSection', { title })}
        </Link>
      </div>
    </div>
  )
}
