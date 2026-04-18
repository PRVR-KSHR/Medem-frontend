import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    // If no hash, scroll to top (hero section)
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = decodeURIComponent(location.hash.replace('#', ''))
    const el = document.getElementById(id)
    if (!el) return

    // allow layout paint
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)

    return () => window.clearTimeout(t)
  }, [location.hash, location.pathname])
}

