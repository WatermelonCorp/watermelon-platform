import { AppRoutes } from "@/components/layout/app-routes";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Providers } from "@/components/layout/providers";
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

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative flex h-[calc(100dvh-1rem)] flex-col overflow-hidden">
        <AppRoutes />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
