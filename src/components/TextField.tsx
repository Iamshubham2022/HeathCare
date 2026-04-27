import type { InputHTMLAttributes } from 'react'
import styles from './TextField.module.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string | null
}

export function TextField({ label, hint, error, id, className, ...rest }: Props) {
  const inputId = id ?? rest.name ?? label.replace(/\s+/g, '-').toLowerCase()

  return (
    <label className={styles.wrap} htmlFor={inputId}>
      <span className={styles.label}>{label}</span>
      <input
        id={inputId}
        className={[styles.input, error ? styles.inputError : '', className ?? '']
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
      {error ? (
        <span className={styles.error} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null}
    </label>
  )
}

