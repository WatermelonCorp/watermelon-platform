import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  loadGtag,
  loadPosthog,
  trackGtagPageView,
  trackPosthogPageView,
} from "@/lib/analytics";

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Defer third-party analytics until after hydration.
    loadGtag();
    loadPosthog();
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    trackGtagPageView(path);
    trackPosthogPageView(path);
  }, [location.pathname, location.search, location.hash]);

  return null;
}
