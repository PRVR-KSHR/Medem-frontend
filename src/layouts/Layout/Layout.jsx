import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import LocationWidget from '../../components/LocationWidget/LocationWidget.jsx'
import { useScrollToHash } from '../../hooks/useScrollToHash.js'
import styles from './Layout.module.css'
import { useState } from 'react'

export default function Layout() {
  useScrollToHash()
  const [showEmergency, setShowEmergency] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <div className={styles.shell}>
      <Navbar 
        onEmergencyClick={() => setShowEmergency(true)}
        onSignInClick={() => setShowSignIn(true)}
      />
      <LocationWidget />
      <main className={styles.main}>
        <Outlet context={{ showEmergency, setShowEmergency, showSignIn, setShowSignIn }} />
      </main>
      <Footer />
    </div>
  )
}
