import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button.jsx'
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector.jsx'
import styles from './Navbar.module.css'
import logo from '../../assets/logo.png'

export default function Navbar({ onEmergencyClick, onSignInClick }) {
  const { t } = useTranslation()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: t('navbar.home'), to: '/#home', key: 'home' },
    { label: t('navbar.services'), to: '/#services', key: 'services' },
    { label: t('navbar.doctors'), to: '/#doctors', key: 'doctors' },
    { label: t('navbar.about'), to: '/#about', key: 'about' }
  ]

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  const activeKey = useMemo(() => {
    const hash = (location.hash || '#home').replace('#', '')
    return hash
  }, [location.hash])

  // Render navigation items
  const renderNav = () => {
    return (
      <>
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            className={`${styles.link} ${activeKey === item.key ? styles.active : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </>
    )
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label="MedEm home">
            <img className={styles.logoImg} src={logo} alt="MedEm logo" />
            <span className={styles.brandText}>
              <span className={styles.brandTitle}>MedEm</span>
              <span className={styles.brandSubtitle}>Care, Everytime, Everywhere</span>
            </span>
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          {renderNav()}
        </nav>

        <div className={styles.actions}>
          <Button variant="primary" size="sm" as="button" onClick={onSignInClick}>
            {t('navbar.register')}
          </Button>
          <LanguageSelector />

          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}>
        <div className={styles.mobilePanel} role="dialog" aria-label="Mobile menu">
          {navItems.map((item) => (
            <Link key={item.key} to={item.to} className={styles.mobileLink}>
              {item.label}
            </Link>
          ))}
          <button 
            onClick={onSignInClick}
            className={styles.mobileLinkStrong}
          >
            {t('navbar.register')}
          </button>
        </div>
      </div>
    </header>
  )
}
