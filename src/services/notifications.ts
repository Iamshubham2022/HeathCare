export async function ensureNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    throw new Error('This browser does not support notifications.')
  }

  if (Notification.permission === 'granted') return 'granted'
  if (Notification.permission === 'denied') return 'denied'
  return await Notification.requestPermission()
}

export async function sendLocalNotification({
  title,
  body,
  url = '/dashboard',
}: {
  title: string
  body: string
  url?: string
}) {
  const permission = await ensureNotificationPermission()
  if (permission !== 'granted') {
    throw new Error('Notification permission was not granted.')
  }

  const reg = await navigator.serviceWorker.ready
  await reg.showNotification(title, {
    body,
    icon: '/favicon.svg',
    tag: 'healthcare-demo',
    data: { url },
  })
}

