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

const POSTHOG_BLOCKED_KEY = 'posthog_blocked_by_client'

async function canReachPosthog(host: string) {
  try {
    const base = host.endsWith('/') ? host.slice(0, -1) : host
    await fetch(`${base}/s/?ip=0&_=preflight`, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
    })
    return true
  } catch {
    return false
  }
}

async function bootstrap() {
  let enablePosthog = false

  if (posthogKey) {
    const blockedByClient = window.localStorage.getItem(POSTHOG_BLOCKED_KEY) === '1'
    if (!blockedByClient) {
      const reachable = await canReachPosthog(posthogHost)
      if (reachable) {
        enablePosthog = true
      } else {
        window.localStorage.setItem(POSTHOG_BLOCKED_KEY, '1')
      }
    }
  }

  createRoot(root!).render(
    <StrictMode>
      {enablePosthog ? (
        <PostHogProvider apiKey={posthogKey} options={options}>
          <App />
        </PostHogProvider>
      ) : (
        <App />
      )}
    </StrictMode>
  )
}

void bootstrap()
