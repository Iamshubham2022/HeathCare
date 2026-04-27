import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'
import styles from './AppLayout.module.css'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/patients', label: 'Patients' },
]

export function AppLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandMark} aria-hidden="true">
            HC
          </div>
          <div className={styles.brandText}>
            <div className={styles.brandName}>HealthCare</div>
            <div className={styles.brandTag}>B2B SaaS</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.user}>
            <div className={styles.userLabel}>Signed in</div>
            <div className={styles.userValue} title={user?.email ?? ''}>
              {user?.email ?? '—'}
            </div>
          </div>
          <button type="button" className={styles.signOut} onClick={signOut}>
            Sign out
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

