import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { setPosthogClient } from './lib/analytics'

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

// In production the main stylesheet ships as a preload so it does not block
// first paint (see nonBlockingCss in vite.config.ts). Attach it and wait, so
// the first render is styled. In dev, Vite injects styles itself.
function loadMainStylesheet() {
  const preload = document.querySelector<HTMLLinkElement>('link[data-main-css]')
  if (!preload) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const sheet = document.createElement('link')
    sheet.rel = 'stylesheet'
    sheet.href = preload.href
    sheet.crossOrigin = preload.crossOrigin
    sheet.onload = sheet.onerror = () => resolve()
    preload.after(sheet)
  })
}

// Nothing reads PostHog through React context, so it loads after the first
// render instead of delaying it or adding ~280 KB to the main bundle.
async function loadPosthog() {
  if (!posthogKey) return
  if (window.localStorage.getItem(POSTHOG_BLOCKED_KEY) === '1') return
  if (!(await canReachPosthog(posthogHost))) {
    window.localStorage.setItem(POSTHOG_BLOCKED_KEY, '1')
    return
  }
  const { default: posthog } = await import('posthog-js')
  posthog.init(posthogKey, options)
  setPosthogClient(posthog)
}

async function bootstrap() {
  await loadMainStylesheet()

  createRoot(root!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )

  await loadPosthog()
}

void bootstrap()
