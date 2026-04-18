import styles from './FadeIn.module.css'
import { useInView } from '../../hooks/useInView.js'

export default function FadeIn({ as: Comp = 'div', children, delay = 0, className = '' }) {
  const { ref, inView } = useInView()

  return (
    <Comp
      ref={ref}
      className={`${styles.base} ${inView ? styles.in : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  )
}
