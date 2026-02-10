import { PricingWidget } from ".";
const plans = {
  monthly: [
    { id: 'basic', title: 'Basic', price: 5.00, popular: false },
    { id: 'standard', title: 'Standard', price: 12.00, popular: true },
    { id: 'premium', title: 'Premium', price: 25.00, popular: false },
  ],
  yearly: [
    { id: 'basic', title: 'Basic', price: 50.00, popular: false },
    { id: 'standard', title: 'Standard', price: 120.00, popular: true },
    { id: 'premium', title: 'Premium', price: 250.00, popular: false },
  ],
};

export default function PricingWidgetDemo() {
  return (
    <PricingWidget
      initialBilling="yearly"
      initialActivePlanId="standard"
      plansData={plans}
    />
  );
}
