import { Link } from 'react-router-dom'
import type { Patient } from '../../data/patients'
import styles from './PatientCard.module.css'

function riskBadgeClass(risk: Patient['riskLevel']) {
  if (risk === 'high') return `${styles.badge} ${styles.high}`
  if (risk === 'medium') return `${styles.badge} ${styles.medium}`
  return `${styles.badge} ${styles.low}`
}

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Link to={`/patients/${patient.id}`} className={styles.card}>
      <div className={styles.top}>
        <div>
          <div className={styles.name}>{patient.name}</div>
          <div className={styles.meta}>
            {patient.age} • {patient.gender} • {patient.condition}
          </div>
        </div>
        <div className={riskBadgeClass(patient.riskLevel)}>{patient.riskLevel.toUpperCase()}</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.kv}>
          <div className={styles.k}>Last visit</div>
          <div className={styles.v}>{patient.lastVisit}</div>
        </div>
        <div className={styles.kv}>
          <div className={styles.k}>Next appt</div>
          <div className={styles.v}>{patient.nextAppointmentInDays}d</div>
        </div>
      </div>
    </Link>
  )
}

