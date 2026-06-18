
import { AssetTableCard } from './components/web3/asset-table-card';
import { borrowedAssets, netWorthAssets } from './data';
import { DashboardTopbar } from './components/web3/topbar';
import { MarketsPanel } from './components/web3/markets-panel';
import { PortfolioPanel } from './components/web3/portfolio-panel';
import { StatGrid } from './components/web3/stat-card';
export default function DashboardView() {
  return (
    <main className="flex-1 px-4 pb-7 lg:px-8">
      <DashboardTopbar />
      <div className="mx-auto grid gap-4">
        <StatGrid />
        <section className="grid gap-3 xl:grid-cols-4">
          <PortfolioPanel />
          <MarketsPanel />
        </section>
        <section className="grid gap-3 xl:grid-cols-2">
          <AssetTableCard
            title="Net Worth"
            assets={netWorthAssets}
            action="Deposit"
            valueLabel="Value"
          />
          <AssetTableCard
            title="Borrowed Assets"
            assets={borrowedAssets}
            action="Borrow More"
            valueLabel="APY"
            external
          />
        </section>
      </div>
    </main>
  );
}