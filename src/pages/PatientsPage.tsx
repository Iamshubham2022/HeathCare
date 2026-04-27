import { PageHeader } from '../components/PageHeader'
import { ViewToggle } from '../components/ViewToggle'
import { PatientCard } from '../components/patients/PatientCard'
import { PatientRow } from '../components/patients/PatientRow'
import { usePatients } from '../state/PatientsContext'
import styles from './PatientsPage.module.css'

export function PatientsPage() {
  const { patients, viewMode, setViewMode } = usePatients()

  return (
    <div>
      <PageHeader
        title="Patients"
        subtitle="Browse and manage patient profiles"
        actions={<ViewToggle value={viewMode} onChange={setViewMode} />}
      />

      {viewMode === 'grid' ? (
        <div className={styles.grid}>
          {patients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          <div className={styles.listHeader}>
            <div>Patient</div>
            <div>Age</div>
            <div>Gender</div>
            <div>Last visit</div>
            <div>Next appt</div>
            <div>Risk</div>
          </div>
          <div className={styles.rows}>
            {patients.map((p) => (
              <PatientRow key={p.id} patient={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

