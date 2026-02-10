type GtagFn = (...args: any[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const POSTHOG_KEY =
  (import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined) ??
  (import.meta.env.VITE_POSTHOG_KEY as string | undefined);
const POSTHOG_HOST =
  (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) ??
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://app.posthog.com";

let posthogInitPromise: Promise<typeof import("posthog-js")["default"]> | null = null;

export function loadGtag() {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined") return;
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer?.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  // Disable default page_view so we can track SPA route changes manually.
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

export function trackGtagPageView(path: string) {
  if (!GA_MEASUREMENT_ID) return;
  if (!window.gtag) return;
  const pageLocation = new URL(path, window.location.origin).toString();
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: pageLocation,
  });
}

export async function loadPosthog() {
  if (!POSTHOG_KEY) return null;
  if (typeof window === "undefined") return null;
  if (!posthogInitPromise) {
    posthogInitPromise = import("posthog-js").then((mod) => {
      mod.default.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: false,
      });
      return mod.default;
    });
  }
  return posthogInitPromise;
}

export async function trackPosthogPageView(path: string) {
  const posthog = await loadPosthog();
  if (!posthog) return;
  const pageLocation = new URL(path, window.location.origin).toString();
  posthog.capture("$pageview", { $current_url: pageLocation });
}

export function trackEvent(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  if (GA_MEASUREMENT_ID) {
    if (!window.gtag) loadGtag();
    window.gtag?.("event", name, props);
  }

  if (POSTHOG_KEY) {
    void loadPosthog().then((posthog) => {
      posthog?.capture(name, props);
    });
  }
}
