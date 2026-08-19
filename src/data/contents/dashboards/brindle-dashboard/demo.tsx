import type { ReactNode } from 'react';
import DashboardLayout from './dashboard-layout';
import { ClientDetailsPage } from './components/brindle/client-details';
import { DashboardPage } from './components/brindle/dashboard-content';
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from './components/brindle/navigation';
import { ThemeProvider } from './components/brindle/theme-provider';

const blankRoutes = new Set([
  '/policy-threads',
  '/documents',
  '/claims-hub',
  '/renewals',
  '/clients',
  '/shared-portfolio',
  '/integrations',
  '/settings',
]);

function DashboardRoute() {
  const { pathname } = useDashboardNavigation();
  let content: ReactNode = null;

  if (pathname === '/') {
    content = <DashboardPage />;
  } else if (pathname.startsWith('/overview/')) {
    content = <ClientDetailsPage />;
  } else if (!blankRoutes.has(pathname)) {
    content = <DashboardPage />;
  }

  return <DashboardLayout>{content}</DashboardLayout>;
}

export default function BrindleDashboardDemo() {
  return (
    <ThemeProvider>
      <DashboardNavigationProvider>
        <DashboardRoute />
      </DashboardNavigationProvider>
    </ThemeProvider>
  );
}
