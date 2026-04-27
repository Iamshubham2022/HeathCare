import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { FullPageLoading } from './components/FullPageLoading'
import { Suspense } from 'react'

export default function App() {
  return (
    <Suspense fallback={<FullPageLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
