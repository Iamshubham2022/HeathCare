import { createBrowserRouter, redirect } from 'react-router-dom'
import { AppLayout } from '../layout/AppLayout'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AuthGate } from './routes/AuthGate'
import { FullPageLoading } from '../components/FullPageLoading'

export const router = createBrowserRouter([
  {
    element: <AuthGate />,
    HydrateFallback: () => <FullPageLoading label="Preparing app…" />,
    children: [
      {
        index: true,
        loader: () => redirect('/dashboard'),
        Component: () => null,
      },
      {
        path: '/login',
        lazy: async () => {
          const mod = await import('../pages/LoginPage')
          return { Component: mod.LoginPage }
        },
      },
      {
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, loader: () => redirect('/dashboard'), Component: () => null },
          {
            path: '/dashboard',
            lazy: async () => {
              const mod = await import('../pages/DashboardPage')
              return { Component: mod.DashboardPage }
            },
          },
          {
            path: '/analytics',
            lazy: async () => {
              const mod = await import('../pages/AnalyticsPage')
              return { Component: mod.AnalyticsPage }
            },
          },
          {
            path: '/patients',
            lazy: async () => {
              const mod = await import('../pages/PatientsPage')
              return { Component: mod.PatientsPage }
            },
          },
          {
            path: '/patients/:patientId',
            lazy: async () => {
              const mod = await import('../pages/PatientProfilePage')
              return { Component: mod.PatientProfilePage }
            },
          },
        ],
      },
    ],
  },
])

