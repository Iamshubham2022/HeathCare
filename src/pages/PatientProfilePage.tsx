import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { usePatients } from '../state/PatientsContext'
import styles from './PatientProfilePage.module.css'

export function PatientProfilePage() {
  const { patientId } = useParams()
  const { getById } = usePatients()
  const patient = patientId ? getById(patientId) : undefined

  if (!patient) {
    return (
      <div className={styles.missing}>
        <PageHeader title="Patient not found" subtitle="The requested profile does not exist." />
        <Link to="/patients" className={styles.back}>
          Back to patients
        </Link>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={patient.name}
        subtitle={`${patient.id} • ${patient.age} • ${patient.gender} • ${patient.condition}`}
        actions={
          <Link to="/patients" className={styles.backBtn}>
            Back to patients
          </Link>
        }
      />

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Contact</div>
          <div className={styles.kv}>
            <div className={styles.k}>Email</div>
            <div className={styles.v}>{patient.email}</div>
          </div>
          <div className={styles.kv}>
            <div className={styles.k}>Phone</div>
            <div className={styles.v}>{patient.phone}</div>
          </div>
          <div className={styles.kv}>
            <div className={styles.k}>Address</div>
            <div className={styles.v}>{patient.address}</div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Clinical</div>
          <div className={styles.kv}>
            <div className={styles.k}>Risk level</div>
            <div className={styles.v}>{patient.riskLevel.toUpperCase()}</div>
          </div>
          <div className={styles.kv}>
            <div className={styles.k}>Last visit</div>
            <div className={styles.v}>{patient.lastVisit}</div>
          </div>
          <div className={styles.kv}>
            <div className={styles.k}>Next appointment</div>
            <div className={styles.v}>In {patient.nextAppointmentInDays} days</div>
          </div>
        </div>
      </div>
    </div>
  )
}

