import styles from './Button.module.css'

export default function Button({ variant = 'primary', size = 'md', as: Comp = 'button', className = '', ...props }) {
  return <Comp className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`} {...props} />
}
