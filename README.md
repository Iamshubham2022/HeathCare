# HealthCare B2B SaaS (Frontend Assignment)

React + TypeScript healthcare SaaS UI with Firebase Authentication, analytics, patient management (grid/list toggle), and a Service Worker–backed notification demo.

## Tech stack

- React + TypeScript (Vite)
- Routing: `react-router-dom`
- State: Zustand
- Auth: Firebase Authentication (Email/Password)
- Charts: Recharts
- Notifications: Service Worker + Notification API

## Getting started

Install:

```bash
npm install
```

Configure Firebase:

- Copy `.env.example` → `.env`
- Fill in your Firebase Web app config values
- In Firebase Console, enable **Authentication → Email/Password**

Run:

```bash
npm run dev
```

## App routes

- `/login`
- `/dashboard`
- `/analytics`
- `/patients` (Grid/List toggle)
- `/patients/:patientId` (Patient profile)

## Notification demo (service worker)

On the Dashboard page, click **Send test notification**.

- If permission is not granted, the browser will prompt you.
- Clicking the notification navigates to `/patients`.
