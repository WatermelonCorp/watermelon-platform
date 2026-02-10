# Analytics Setup (GA4 + PostHog)

This project uses **GA4 for marketing attribution** and **PostHog for product analytics**.

## What Each Tool Is For

**GA4 (Marketing & Attribution)**
- Focus: where users came from, ad performance, and conversion attribution.
- Answers: “Which Google Ads campaign generated the most revenue?”
- Integrations: Google Ads, Search Console.

**PostHog (Product Analytics)**
- Focus: in‑app behavior and feature usage.
- Features: session recordings, funnels, engagement.
- Answers: “Where do users drop in onboarding?”, “Which features are used most?”

---

## Environment Variables

Create a `.env` (local) and add the following:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_POSTHOG_KEY=phc_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_POSTHOG_HOST=https://app.posthog.com
VITE_SITE_URL=https://watermelon-ui.com
```

### Cloudflare Workers (build-time)
Because this is a Vite app, these **must be set at build time** in your Cloudflare environment:

- `VITE_GA_MEASUREMENT_ID`
- `VITE_POSTHOG_KEY`
- `VITE_POSTHOG_HOST` (optional if using `https://app.posthog.com`)
- `VITE_SITE_URL`

---

## Implementation Overview

**Location**
- Core tracking helpers: `/Users/m_sanjid/Developer/watermelon-platform/src/lib/analytics.ts`
- Router hook for SPA page views: `/Users/m_sanjid/Developer/watermelon-platform/src/components/analytics/analytics.tsx`

**SPA Page Views**
- GA4: `page_view` events are fired manually on route changes.
- PostHog: `$pageview` is captured on route changes.

**Custom Events**
Events are sent to **both GA4 and PostHog** via `trackEvent()`:
- `component_view`
- `block_view`
- `dashboard_view`
- `install_command_copy`
- `manual_install_copy`
- `ai_prompt_copy`
- `code_copy`
- `cta_view_all_click`
- `component_card_click`
- `dashboard_card_click`
- `block_card_click`

---

## Verification Checklist

### GA4
1. Open GA4 → Admin → Data Streams → Web
2. Confirm Measurement ID matches `VITE_GA_MEASUREMENT_ID`
3. Use GA4 Realtime to verify:
   - `page_view` events
   - custom events like `install_command_copy`

### PostHog
1. Open PostHog → Project Settings → API Keys
2. Confirm API key matches `VITE_POSTHOG_KEY`
3. Use “Live events” to verify:
   - `$pageview`
   - `component_view`
   - `ai_prompt_copy`

---

## Notes

- GA4 is **marketing attribution** only.
- PostHog is **product usage & engagement**.
- Both systems receive the same product events to keep attribution and behavior aligned.

If you want different event naming conventions or additional properties (utm params, plan, referrer), add them in `trackEvent` in `/Users/m_sanjid/Developer/watermelon-platform/src/lib/analytics.ts`.
