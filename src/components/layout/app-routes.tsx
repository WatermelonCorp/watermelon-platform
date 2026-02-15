import { lazy, Suspense } from "react";
import {
  Routes,
  Route,
  Navigate,
  useMatch,
} from "react-router-dom";
import { PageLayout } from "@/components/layout/page-layout";
import { HomePageSkeleton, ComponentPageSkeleton, DocPageSkeleton } from "@/components/skeletons";

const HomePage = lazy(() => import("@/pages/home"));
const ComponentsPage = lazy(() => import("@/pages/components"));
const ComponentPage = lazy(() => import("@/pages/component"));
const CategoryPage = lazy(() => import("@/pages/category"));
const BasicUsagePage = lazy(() => import("@/pages/basic-usage"));
const InstallationPage = lazy(() => import("@/pages/installation"));
const FrameworkSupportPage = lazy(() => import("@/pages/framework-support"));
const CLIPage = lazy(() => import("@/pages/cli"));
const TermsPage = lazy(() => import("@/pages/terms"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const CopyrightPage = lazy(() => import("@/pages/copyright"));
// const DashboardsPage = lazy(() => import("@/pages/dashboards"));
// const DashboardPage = lazy(() => import("@/pages/dashboard"));
// Coming Soon - disabled for now
// const BlocksPage = lazy(() => import("@/pages/blocks"));
// const BlockPage = lazy(() => import("@/pages/block"));
const ChangelogPage = lazy(() => import("@/pages/changelog"));

export function AppRoutes() {
  const isComponentPage = useMatch("/components/:slug");

  return (
    <PageLayout showScrollProgress={!isComponentPage}>
      <Routes>
        {/* Home page with card grid skeleton */}
        <Route
          path="/"
          element={
            <Suspense fallback={<HomePageSkeleton />}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path="/components"
          element={
            <Suspense fallback={<HomePageSkeleton />}>
              <ComponentsPage />
            </Suspense>
          }
        />

        {/* Component page with panel skeleton */}
        <Route
          path="/components/:slug"
          element={
            <Suspense fallback={<ComponentPageSkeleton />}>
              <ComponentPage />
            </Suspense>
          }
        />

        {/* Category page with card grid skeleton */}
        <Route
          path="/components/category/:category"
          element={
            <Suspense fallback={<HomePageSkeleton />}>
              <CategoryPage />
            </Suspense>
          }
        />

        {/* Documentation pages with doc skeleton */}
        <Route
          path="/basic-usage"
          element={
            <Suspense fallback={<DocPageSkeleton />}>
              <BasicUsagePage />
            </Suspense>
          }
        />
        <Route
          path="/installation"
          element={
            <Suspense fallback={<DocPageSkeleton />}>
              <InstallationPage />
            </Suspense>
          }
        />
        <Route
          path="/framework-support"
          element={
            <Suspense fallback={<DocPageSkeleton />}>
              <FrameworkSupportPage />
            </Suspense>
          }
        />
        <Route
          path="/cli"
          element={
            <Suspense fallback={<DocPageSkeleton />}>
              <CLIPage />
            </Suspense>
          }
        />
        <Route
          path="/changelog"
          element={
            <Suspense fallback={<DocPageSkeleton />}>
              <ChangelogPage />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<DocPageSkeleton />}>
              <TermsPage />
            </Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <Suspense fallback={<DocPageSkeleton />}>
              <PrivacyPage />
            </Suspense>
          }
        />
        <Route
          path="/copyright"
          element={
            <Suspense fallback={<DocPageSkeleton />}>
              <CopyrightPage />
            </Suspense>
          }
        />

        {/* Dashboard pages - disabled, redirect to home */}
        <Route path="/dashboards" element={<Navigate to="/" replace />} />
        <Route path="/dashboard/:slug" element={<Navigate to="/" replace />} />

        {/* Block pages - Coming Soon, redirect to home */}
        <Route path="/blocks" element={<Navigate to="/" replace />} />
        <Route path="/block/:slug" element={<Navigate to="/" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageLayout>
  );
}
