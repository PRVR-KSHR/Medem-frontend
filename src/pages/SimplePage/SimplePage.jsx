import { Link } from 'react-router-dom'
import styles from './SimplePage.module.css'

export default function SimplePage({ title, hashFallback }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.h1}>{title}</h1>
        <p className={styles.p}>
          This route exists so all navigation links work. The full design is on the main landing page.
        </p>
        <Link to={`/#${hashFallback}`} className={styles.link}>
          Go to {title} section
        </Link>
      </div>
    </div>
  )
}
