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
const ComponentPage = lazy(() => import("@/pages/component"));
const CategoryPage = lazy(() => import("@/pages/category"));
const BasicUsagePage = lazy(() => import("@/pages/basic-usage"));
const InstallationPage = lazy(() => import("@/pages/installation"));
const FrameworkSupportPage = lazy(() => import("@/pages/framework-support"));
const CLIPage = lazy(() => import("@/pages/cli"));

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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageLayout>
  );
}
