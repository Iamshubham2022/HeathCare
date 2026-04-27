import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FullPageLoading } from '../../components/FullPageLoading'
import { useAuth } from '../../state/AuthContext'

export function AuthGate() {
  const location = useLocation()
  const { status, user } = useAuth()

  if (status === 'loading') return <FullPageLoading label="Loading session…" />

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (user && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

