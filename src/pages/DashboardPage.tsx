import { useState } from 'react'
import { Button } from '../components/Button'
import { Callout } from '../components/Callout'
import { PageHeader } from '../components/PageHeader'
import { StatCard } from '../components/StatCard'
import { sendLocalNotification } from '../services/notifications'
import { usePatients } from '../state/PatientsContext'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  const { patients } = usePatients()
  const [notifError, setNotifError] = useState<string | null>(null)
  const [notifOk, setNotifOk] = useState<string | null>(null)

  const total = patients.length
  const critical = patients.filter((p) => p.riskLevel === 'high').length
  const upcoming = patients.filter((p) => p.nextAppointmentInDays <= 7).length

  async function onTestNotification() {
    setNotifError(null)
    setNotifOk(null)
    try {
      await sendLocalNotification({
        title: 'Patient follow-up reminder',
        body: '3 patients need follow-up in the next 7 days.',
        url: '/patients',
      })
      setNotifOk('Notification delivered (check your system notifications).')
    } catch (e) {
      setNotifError(e instanceof Error ? e.message : 'Failed to send notification.')
    }
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Operational overview across your patient population"
        actions={
          <Button variant="secondary" type="button" onClick={onTestNotification}>
            Send test notification
          </Button>
        }
      />

      {notifError ? (
        <div className={styles.callout}>
          <Callout title="Notification error" variant="error">
            {notifError}
          </Callout>
        </div>
      ) : null}

      {notifOk ? (
        <div className={styles.callout}>
          <Callout title="Notification sent" variant="info">
            {notifOk}
          </Callout>
        </div>
      ) : null}

      <div className={styles.grid}>
        <StatCard label="Total patients" value={String(total)} hint="Active profiles in your org" />
        <StatCard label="High risk" value={String(critical)} hint="Requires review this week" />
        <StatCard label="Upcoming appointments" value={String(upcoming)} hint="Next 7 days" />
        <StatCard label="SLA health" value="98%" hint="Ticket response compliance" />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelTitle}>What’s new</div>
        <ul className={styles.list}>
          <li>New analytics dashboard shipped with cohort filters.</li>
          <li>Patient view toggle supports grid and list modes.</li>
          <li>Service worker notification demo available via the button above.</li>
        </ul>
      </div>
    </div>
  )
}

