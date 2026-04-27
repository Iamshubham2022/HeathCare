import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { user, status } = useAuth()

  if (status === 'loading') return null
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

