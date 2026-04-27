import styles from './ViewToggle.module.css'

export function ViewToggle({
  value,
  onChange,
}: {
  value: 'grid' | 'list'
  onChange: (v: 'grid' | 'list') => void
}) {
  return (
    <div className={styles.wrap} role="group" aria-label="View mode">
      <button
        type="button"
        className={value === 'grid' ? `${styles.btn} ${styles.active}` : styles.btn}
        onClick={() => onChange('grid')}
      >
        Grid
      </button>
      <button
        type="button"
        className={value === 'list' ? `${styles.btn} ${styles.active}` : styles.btn}
        onClick={() => onChange('list')}
      >
        List
      </button>
    </div>
  )
}

