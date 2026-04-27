import styles from './FullPageLoading.module.css'

export function FullPageLoading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.card}>
        <div className={styles.spinner} aria-hidden="true" />
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  )
}

