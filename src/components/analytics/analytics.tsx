import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  loadGtag,
  trackEvent,
  trackGtagPageView,
  trackPosthogPageView,
} from "@/lib/analytics";

const DOWNLOAD_EXTENSIONS = new Set([
  "zip",
  "pdf",
  "csv",
  "xlsx",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "mov",
  "mp4",
  "webm",
  "mp3",
  "png",
  "jpg",
  "jpeg",
  "svg",
  "json",
]);

function getFileExtension(url: URL) {
  const filename = url.pathname.split("/").pop();
  if (!filename || !filename.includes(".")) return "";
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

function getSearchTerm(params: URLSearchParams) {
  return (
    params.get("q") ??
    params.get("query") ??
    params.get("search") ??
    params.get("term")
  );
}

export function Analytics() {
  const location = useLocation();
  const trackedScrollDepth = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Defer third-party analytics until after hydration.
    loadGtag();
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor?.href) return;

      let href: URL;
      try {
        href = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      const isOutbound = href.origin !== window.location.origin;
      const extension = getFileExtension(href);
      const isDownload = anchor.hasAttribute("download") || DOWNLOAD_EXTENSIONS.has(extension);
      const text = anchor.textContent?.trim().slice(0, 120) || undefined;
      const commonProps = {
        link_url: href.toString(),
        link_domain: href.hostname,
        link_path: href.pathname,
        link_text: text,
        file_extension: extension || undefined,
        download_candidate: isDownload || undefined,
      };

      if (isOutbound) {
        trackEvent("outbound_click", {
          ...commonProps,
          link_type: "external",
        });
      } else {
        trackEvent("internal_link_click", {
          ...commonProps,
          link_type: "internal",
        });
      }
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;
      trackEvent("form_submit", {
        form_id: form.id || undefined,
        form_name: form.getAttribute("name") || undefined,
        form_action: form.getAttribute("action") || undefined,
        form_method: (form.getAttribute("method") || "get").toLowerCase(),
      });
    };

    const onError = (event: ErrorEvent) => {
      trackEvent("exception", {
        description: event.message || "Unknown error",
        fatal: false,
        source: event.filename || undefined,
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason =
        typeof event.reason === "string"
          ? event.reason
          : event.reason instanceof Error
            ? event.reason.message
            : "Unhandled promise rejection";
      trackEvent("exception", {
        description: reason,
        fatal: false,
      });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  useEffect(() => {
    trackedScrollDepth.current.clear();
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const thresholds = [50, 90];
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const threshold of thresholds) {
        if (percent >= threshold && !trackedScrollDepth.current.has(threshold)) {
          trackedScrollDepth.current.add(threshold);
          trackEvent("scroll", { percent_scrolled: threshold });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    trackGtagPageView(path);
    trackPosthogPageView(path);

    const query = getSearchTerm(new URLSearchParams(location.search));
    if (query) {
      trackEvent("view_search_results", {
        search_term: query.slice(0, 120),
      });
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
}
