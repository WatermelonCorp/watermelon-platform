import { AppRoutes } from "@/components/layout/app-routes";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Providers } from "@/components/layout/providers";
import { ProductsBar } from "@/components/layout/products-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const isPreview = location.pathname.startsWith("/preview/");
  const isLanding = location.pathname === "/";

  // Landing page and preview pages render without sidebar/layout chrome entirely
  if (isPreview || isLanding) {
    return <AppRoutes />;
  }

  // --products-bar-h lets the fixed sidebar and full-height pages sit below the bar
  return (
    <div style={{ "--products-bar-h": "2.25rem" } as React.CSSProperties}>
      <ProductsBar />
      <SidebarProvider className="min-h-[calc(100svh-var(--products-bar-h))]">
        <AppSidebar />
        <SidebarInset className="relative flex h-[calc(100dvh-1rem-var(--products-bar-h))] flex-col overflow-hidden">
          <AppRoutes />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
