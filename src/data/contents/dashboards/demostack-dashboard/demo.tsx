import DashboardLayout from './dashboard-layout';
import { DashboardContent } from './components/demostack/dashboard-content';
import { DemostacksContent } from './components/demostack/demostacks-content';
import { useLocation } from './components/demostack/navigation';

export default function DemostackDashboardDemo() {
  const { pathname } = useLocation();

  return (
    <DashboardLayout>
      {pathname === '/demostacks' ? <DemostacksContent /> : <DashboardContent />}
    </DashboardLayout>
  );
}
