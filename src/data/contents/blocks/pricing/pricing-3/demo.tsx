import { Pricing3 } from "./index";

const demoEnterprisePlan = {
  title: "Premium Enterprise",
  description: "Looking for tailored solutions, dedicated account management, and advanced security protocols? We offer custom setups for large organizations.",
  buttonText: "Talk to Sales",
  footnote: "Custom billing available"
};

const demoPlans = [
  {
    id: "plan-pro",
    name: "Professional",
    price: "$29/mo",
    description: "Ideal for growing startups and small teams needing robust functionality.",
    isPopular: true,
    popularBadgeText: "Most Recommended",
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const,
    features: [
      { text: "Up to 10 team members" },
      { text: "Advanced analytics dashboard" },
      { text: "Priority email & chat support" },
      { text: "100GB secure cloud storage" },
      { text: "Custom domain integration" }
    ]
  },
  {
    id: "plan-business",
    name: "Business",
    price: "$89/mo",
    description: "Built for scaling companies requiring maximum power and control.",
    isPopular: false,
    buttonText: "Upgrade to Business",
    buttonVariant: "secondary" as const,
    features: [
      { text: "Unlimited team members" },
      { text: "Predictive AI analytics" },
      { text: "24/7 dedicated phone support" },
      { text: "Unlimited secure cloud storage" },
      { text: "Advanced security & compliance" }
    ]
  }
];

export default function Pricing3Demo() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Pricing3 
        badgeText="Subscription Plans"
        title="Flexible plans designed for growth"
        subtitle="Discover the perfect package tailored to empower your team and scale your operations without breaking the bank."
        enterprisePlan={demoEnterprisePlan}
        plans={demoPlans}
        footerText="We believe in fair pricing globally. If you are a student, educator, or non-profit, please reach out for specialized discount programs. Contact us via our support page."
      />
    </div>
  );
}
