import type { ReactNode } from 'react'
import styles from './Callout.module.css'

export function Callout({
  title,
  children,
  variant = 'info',
}: {
  title: string
  children: ReactNode
  variant?: 'info' | 'error'
}) {
  return (
    <div className={variant === 'error' ? `${styles.base} ${styles.error}` : styles.base}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

