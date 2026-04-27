import type { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
import { PatientsProvider } from './PatientsContext'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PatientsProvider>{children}</PatientsProvider>
    </AuthProvider>
  )
}

