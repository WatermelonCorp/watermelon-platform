import { AppRoutes } from "@/components/layout/app-routes";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Providers } from "@/components/layout/providers";
import { SidebarInset } from "@/components/ui/sidebar";

export default function App() {
  return (
    <Providers>
      <AppSidebar />
      <SidebarInset className="relative flex h-[calc(100dvh-1rem)] flex-col overflow-hidden">
        <AppRoutes />
      </SidebarInset>
    </Providers>
  );
}
