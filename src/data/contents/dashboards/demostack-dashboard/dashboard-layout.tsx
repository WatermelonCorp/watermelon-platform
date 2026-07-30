import type { ReactNode } from 'react';
import { DashboardSidebar } from './components/demostack/sidebar';
import { DashboardTopbar } from './components/demostack/topbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import './dashboard.css';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      defaultOpen
      className="demostack-dashboard h-svh gap-2.5 overflow-hidden"
    >
      <DashboardSidebar />
      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="bg-background relative z-50 shrink-0 md:px-1.5 md:pt-1.5">
          <DashboardTopbar />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto md:px-1.5 md:pb-1.5">
          <div className="bg-background flex min-h-full w-full flex-col border-x border-b md:rounded-b-2xl">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
