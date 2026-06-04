import Pricing2 from "./index";

const dummyTiers = [
  {
    id: "tier-essential",
    name: "Essential",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    priceUnit: "Month",
    buttonText: "Get Started Now",
    features: [
      { name: "Up to 5 team members" },
      { name: "Basic workspace analytics" },
      { name: "Community forum access" },
      { name: "Standard integrations" },
    ],
  },
  {
    id: "tier-professional",
    name: "Professional",
    monthlyPrice: "$39",
    yearlyPrice: "$29",
    priceUnit: "Month",
    buttonText: "Start 14-Day Free Trial",
    features: [
      { name: "Unlimited team members" },
      { name: "Advanced performance metrics" },
      { name: "Priority email & chat support" },
      { name: "Custom workflow automation" },
    ],
  },
  {
    id: "tier-business",
    name: "Business",
    monthlyPrice: "$149",
    yearlyPrice: "$119",
    priceUnit: "Month",
    buttonText: "Start 14-Day Free Trial",
    isHighlighted: true,
    features: [
      { name: "Everything in Professional" },
      { name: "Dedicated success manager" },
      { name: "SAML Single Sign-On (SSO)" },
      { name: "Role-based access control" },
      { name: "Data export & compliance" },
    ],
  },
  {
    id: "tier-enterprise",
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    priceUnit: "",
    buttonText: "Contact Sales Team",
    features: [
      { name: "Custom deployment options" },
      { name: "White-label branding" },
      { name: "24/7 dedicated phone support" },
      { name: "Customized SLA agreements" },
    ],
  },
];

export default function Pricing2Demo() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-background">
      <Pricing2 
        title="Simple, transparent pricing for teams of all sizes"
        subtitle="Choose the plan that fits your needs. No hidden fees, ever."
        yearlyLabel="Pay Yearly"
        monthlyLabel="Pay Monthly"
        discountText="Save 20%"
        tiers={dummyTiers}
      />
    </div>
  );
}
