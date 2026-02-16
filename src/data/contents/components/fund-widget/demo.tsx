import { type FundItem, FundWidget } from '.';

const customData: FundItem[] = [
  {
    id: 'stocks',
    label: 'Stocks',
    value: '2.7Cr',
    change: '12% ',
  },
  { id: 'funds', label: 'Funds', value: '3.5Cr', change: '8% ' },
  {
    id: 'deposits',
    label: 'Deposits',
    value: '1.2Cr',
    change: '6% ',
  },
];

export default function FundWidgetDemo() {
  return <FundWidget data={customData} initialIndex={0} />;
}
