import { lazy, Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Providers } from "@/components/layout/providers";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("@/pages/home"));
const CategoryPage = lazy(() => import("@/pages/category"));
const BasicUsagePage = lazy(() => import("@/pages/basic-usage"));
const InstallationPage = lazy(() => import("@/pages/installation"));
const FrameworkSupportPage = lazy(() => import("@/pages/framework-support"));
const CLIPage = lazy(() => import("@/pages/cli"));

// Simple loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

export function App() {
  return (
    <Providers>
      <AppSidebar />
      <SidebarInset className="relative flex h-[calc(100vh-12px)] flex-col">
        {/* Main scrollable area that contains both navbar and content */}
        <div className="flex-1 overflow-y-auto">
          {/* Sticky navbar - will stick when scrolling the main container */}
          <Navbar />
          <div className="flex flex-col gap-4 p-4">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/components/category/:category" element={<CategoryPage />} />
                <Route path="/basic-usage" element={<BasicUsagePage />} />
                <Route path="/installation" element={<InstallationPage />} />
                <Route path="/framework-support" element={<FrameworkSupportPage />} />
                <Route path="/cli" element={<CLIPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </Providers>
  );
}

export default App;
