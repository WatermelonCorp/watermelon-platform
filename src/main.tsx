import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PostHogProvider } from '@posthog/react'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element #root not found')
}

const posthogKey =
  import.meta.env.VITE_PUBLIC_POSTHOG_KEY ?? import.meta.env.VITE_POSTHOG_KEY
const posthogHost =
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST ??
  import.meta.env.VITE_POSTHOG_HOST ??
  'https://us.i.posthog.com'

const options = {
  api_host: posthogHost,
  defaults: '2026-01-30',
  capture_pageview: false,
  autocapture: false,
} as const

createRoot(root).render(
  <StrictMode>
    <PostHogProvider apiKey={posthogKey} options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>
)
