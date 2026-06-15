
import { DashboardSidebar } from './components/web3/sidebar';
import './globals.css';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { CSSProperties } from 'react';

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <SidebarProvider
      className="bg-background text-foreground min-h-screen font-sans"
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 64)',
          '--sidebar-width-icon': 'calc(var(--spacing) * 14)',
        } as CSSProperties
      }
    >
      <DashboardSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
