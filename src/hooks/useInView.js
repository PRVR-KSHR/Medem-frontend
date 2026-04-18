import { useEffect, useRef, useState } from 'react'

export function useInView(options = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, options)

    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}
