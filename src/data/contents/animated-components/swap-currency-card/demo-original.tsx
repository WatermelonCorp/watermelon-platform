import { SwapCurrencyCard, type Currency } from './original';

const DEMO_CURRENCIES: Currency[] = [
  { code: 'USD', countryCode: 'us', flag: '🇺🇸', rate: 1, name: 'US Dollar' },
  { code: 'EUR', countryCode: 'eu', flag: '🇪🇺', rate: 0.92, name: 'Euro' },
  { code: 'INR', countryCode: 'in', flag: '🇮🇳', rate: 83.12, name: 'Indian Rupee' },
  { code: 'GBP', countryCode: 'gb', flag: '🇬🇧', rate: 0.79, name: 'British Pound' },
  { code: 'JPY', countryCode: 'jp', flag: '🇯🇵', rate: 150.2, name: 'Japanese Yen' },
];

function SwapCurrencyCardDemo() {
  return <SwapCurrencyCard currencies={DEMO_CURRENCIES} defaultAmount="10" />;
}

export default SwapCurrencyCardDemo;
