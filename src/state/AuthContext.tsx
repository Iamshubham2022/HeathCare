import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  type User,
} from 'firebase/auth'
import { getFirebaseAuth } from '../services/firebase'

export type AuthStatus = 'loading' | 'ready'

export type AuthUser = {
  uid: string
  email: string | null
}

type AuthContextValue = {
  status: AuthStatus
  user: AuthUser | null
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function toAuthUser(u: User): AuthUser {
  return { uid: u.uid, email: u.email }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let auth
    try {
      auth = getFirebaseAuth()
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to initialize Firebase Auth.'
      setError(msg)
      setStatus('ready')
      setUser(null)
      return
    }

    const unsub = onAuthStateChanged(
      auth,
      (u) => {
        setUser(u ? toAuthUser(u) : null)
        setError(null)
        setStatus('ready')
      },
      (err) => {
        setUser(null)
        setError(err.message)
        setStatus('ready')
      }
    )

    return () => unsub()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null)
    const auth = getFirebaseAuth()
    await signInWithEmailAndPassword(auth, email, password)
  }, [])

  const signOut = useCallback(async () => {
    setError(null)
    const auth = getFirebaseAuth()
    await fbSignOut(auth)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, error, signIn, signOut }),
    [status, user, error, signIn, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>.')
  return ctx
}

