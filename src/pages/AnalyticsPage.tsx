import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '../components/PageHeader'
import { usePatients } from '../state/PatientsContext'
import styles from './AnalyticsPage.module.css'

export function AnalyticsPage() {
  const { patients } = usePatients()

  const riskData = [
    { name: 'Low', value: patients.filter((p) => p.riskLevel === 'low').length },
    { name: 'Medium', value: patients.filter((p) => p.riskLevel === 'medium').length },
    { name: 'High', value: patients.filter((p) => p.riskLevel === 'high').length },
  ]

  const appointments = [
    { bucket: '0-7d', count: patients.filter((p) => p.nextAppointmentInDays <= 7).length },
    {
      bucket: '8-14d',
      count: patients.filter((p) => p.nextAppointmentInDays >= 8 && p.nextAppointmentInDays <= 14)
        .length,
    },
    {
      bucket: '15-30d',
      count: patients.filter((p) => p.nextAppointmentInDays >= 15 && p.nextAppointmentInDays <= 30)
        .length,
    },
    { bucket: '>30d', count: patients.filter((p) => p.nextAppointmentInDays > 30).length },
  ]

  return (
    <div className={styles.root}>
      <PageHeader title="Analytics" subtitle="At-a-glance trends for operations & care teams" />

      <div className={styles.identityBand}>
        <div className={styles.identityDot} aria-hidden="true" />
        <span>Healthcare intelligence overview</span>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.riskCard}`}>
          <div className={styles.cardTitle}>Risk distribution</div>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskData} dataKey="value" nameKey="name" outerRadius={90} label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${styles.card} ${styles.appointmentCard}`}>
          <div className={styles.cardTitle}>Upcoming appointments</div>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointments} margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="bucket" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Patients" fill="rgba(0, 122, 255, 0.85)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.note}>
        This is mock analytics derived from the in-app patient seed data.
      </div>
    </div>
  )
}

