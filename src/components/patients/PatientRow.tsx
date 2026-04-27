import { Link } from 'react-router-dom'
import type { Patient } from '../../data/patients'
import styles from './PatientRow.module.css'

function riskClass(risk: Patient['riskLevel']) {
  if (risk === 'high') return `${styles.risk} ${styles.high}`
  if (risk === 'medium') return `${styles.risk} ${styles.medium}`
  return `${styles.risk} ${styles.low}`
}

export function PatientRow({ patient }: { patient: Patient }) {
  return (
    <Link to={`/patients/${patient.id}`} className={styles.row}>
      <div className={styles.name}>
        <div className={styles.primary}>{patient.name}</div>
        <div className={styles.secondary}>{patient.condition}</div>
      </div>
      <div className={styles.cell}>{patient.age}</div>
      <div className={styles.cell}>{patient.gender}</div>
      <div className={styles.cell}>{patient.lastVisit}</div>
      <div className={styles.cell}>{patient.nextAppointmentInDays}d</div>
      <div className={riskClass(patient.riskLevel)}>{patient.riskLevel}</div>
    </Link>
  )
}

