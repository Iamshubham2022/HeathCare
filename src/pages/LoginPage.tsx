import { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Callout } from '../components/Callout'
import { TextField } from '../components/TextField'
import { useAuth } from '../state/AuthContext'
import styles from './LoginPage.module.css'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function LoginPage() {
  const { signIn, error: authError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const emailError = useMemo(() => {
    if (!email) return 'Email is required.'
    if (!isValidEmail(email)) return 'Enter a valid email.'
    return null
  }, [email])

  const passwordError = useMemo(() => {
    if (!password) return 'Password is required.'
    if (password.length < 6) return 'Password must be at least 6 characters.'
    return null
  }, [password])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)

    if (emailError || passwordError) {
      setFormError('Please fix the fields below.')
      return
    }

    setSubmitting(true)
    try {
      await signIn(email, password)
      // Navigation is handled by AuthGate once the session updates.
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo} aria-hidden="true">
            HC
          </div>
          <div>
            <div className={styles.title}>Sign in</div>
            <div className={styles.subtitle}>Access your healthcare workspace</div>
          </div>
        </div>

        {authError ? (
          <Callout title="Firebase Auth error" variant="error">
            {authError}
          </Callout>
        ) : null}

        {formError ? (
          <Callout title="Could not sign in" variant="error">
            {formError}
          </Callout>
        ) : null}

        <form onSubmit={onSubmit} className={styles.form}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            error={email ? emailError : null}
            placeholder="name@company.com"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            error={password ? passwordError : null}
            placeholder="••••••••"
          />

          <Button fullWidth type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <div className={styles.footer}>
          <div className={styles.footerHint}>
            Tip: use a Firebase Email/Password user in your project.
          </div>
        </div>
      </div>
    </div>
  )
}

