import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { seedPatients, type Patient } from '../data/patients'

export type PatientViewMode = 'grid' | 'list'

type PatientsContextValue = {
  patients: Patient[]
  viewMode: PatientViewMode
  setViewMode: (mode: PatientViewMode) => void
  getById: (id: string) => Patient | undefined
}

const PatientsContext = createContext<PatientsContextValue | null>(null)

export function PatientsProvider({ children }: { children: ReactNode }) {
  const [patients] = useState<Patient[]>(seedPatients)
  const [viewMode, setViewMode] = useState<PatientViewMode>('grid')

  const value = useMemo<PatientsContextValue>(() => {
    return {
      patients,
      viewMode,
      setViewMode,
      getById: (id: string) => patients.find((p) => p.id === id),
    }
  }, [patients, viewMode])

  return <PatientsContext.Provider value={value}>{children}</PatientsContext.Provider>
}

export function usePatients() {
  const ctx = useContext(PatientsContext)
  if (!ctx) throw new Error('usePatients must be used within <PatientsProvider>.')
  return ctx
}

