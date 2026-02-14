import posthog from "posthog-js";

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

function mapEventNameForPosthog(name: string) {
  switch (name) {
    case "outbound_click":
    case "internal_link_click":
      return "link_clicked";
    case "view_search_results":
      return "search_results_viewed";
    case "scroll":
      return "page_scrolled";
    case "exception":
      return "client_exception";
    default:
      return name;
  }
}

function hasGtag() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

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
  if (!hasGtag()) return;
  const pageLocation = new URL(path, window.location.origin).toString();
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: pageLocation,
  });
}

export function trackPosthogPageView(path: string) {
  if (!POSTHOG_KEY) return;
  const pageLocation = new URL(path, window.location.origin).toString();
  posthog.capture("$pageview", { $current_url: pageLocation });
}

export function trackEvent(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const pagePath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const enrichedProps: Record<string, unknown> = {
    page_path: pagePath,
    page_url: window.location.href,
    page_title: document.title,
    ...props,
  };

  if (GA_MEASUREMENT_ID || hasGtag()) {
    if (!window.gtag && GA_MEASUREMENT_ID) loadGtag();
    window.gtag?.("event", name, enrichedProps);
  }

  if (POSTHOG_KEY) {
    posthog.capture(mapEventNameForPosthog(name), enrichedProps);
  }
}
