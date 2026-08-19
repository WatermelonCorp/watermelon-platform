import type { CSSProperties, ReactNode } from 'react'
import { DashboardSidebar } from './components/brindle/sidebar'
import { DashboardTopbar } from './components/brindle/topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import './dashboard.css'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      defaultOpen
      className="brindle-dashboard h-svh overflow-hidden no-scrollbar"
      style={
        {
          '--sidebar-width': '18.125rem',
          '--sidebar-width-icon': '4.5rem',
        } as CSSProperties
      }
    >
      <DashboardSidebar />

      <main className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <div className="flex-1 overflow-y-auto bg-background">{children}</div>
      </main>
    </SidebarProvider>
  )
}
