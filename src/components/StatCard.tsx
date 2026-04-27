import type { ReactNode } from 'react'
import styles from './StatCard.module.css'

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string
  value: string
  hint?: string
  icon?: ReactNode
}) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.label}>{label}</div>
        {icon ? <div className={styles.icon}>{icon}</div> : null}
      </div>
      <div className={styles.value}>{value}</div>
      {hint ? <div className={styles.hint}>{hint}</div> : null}
    </div>
  )
}

