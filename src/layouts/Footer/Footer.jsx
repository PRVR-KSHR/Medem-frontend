import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <span className={styles.mark} aria-hidden="true" />
            <span className={styles.word}>Shifa</span>
          </div>
          <p className={styles.desc}>
            {t('footer.tagline')}
          </p>
          <div className={styles.social} aria-label="Social links">
            <a href="#" aria-label="Social" className={styles.soc} />
            <a href="#" aria-label="Social" className={styles.soc} />
            <a href="#" aria-label="Social" className={styles.soc} />
            <a href="#" aria-label="Social" className={styles.soc} />
          </div>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <div className={styles.title}>{t('footer.navigation')}</div>
            <Link to="/#home" className={styles.link}>{t('footer.home')}</Link>
            <Link to="/#about" className={styles.link}>{t('footer.about')}</Link>
            <Link to="/#services" className={styles.link}>{t('footer.services')}</Link>
            <Link to="/#doctors" className={styles.link}>{t('footer.doctors')}</Link>
            <Link to="/#blog" className={styles.link}>{t('footer.blog')}</Link>
          </div>
          <div className={styles.col}>
            <div className={styles.title}>{t('footer.footerServices')}</div>
            <Link to="/#services" className={styles.link}>{t('footer.generalCheckups')}</Link>
            <Link to="/#services" className={styles.link}>{t('footer.cardiology')}</Link>
            <Link to="/#services" className={styles.link}>{t('footer.orthopedics')}</Link>
            <Link to="/#services" className={styles.link}>{t('footer.mentalHealth')}</Link>
            <Link to="/#services" className={styles.link}>{t('footer.emergencyCare')}</Link>
            <Link to="/#services" className={styles.link}>{t('footer.physicalTherapy')}</Link>
          </div>
          <div className={styles.col}>
            <div className={styles.title}>{t('footer.contact')}</div>
            <div className={styles.meta}>{t('footer.phone')}</div>
            <div className={styles.meta}>{t('footer.supportEmail')}</div>
            <div className={styles.meta}>{t('footer.address')}</div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <div className={styles.copy}>© {new Date().getFullYear()} {t('footer.copyright')}</div>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>{t('footer.termsOfService')}</a>
            <a href="#" className={styles.bottomLink}>{t('footer.privacyPolicy')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
