import { Pricing1 } from "./index";

const dummyPlans = [
  {
    id: "starter",
    title: "Starter",
    description: "Perfect for individuals and hobbyists just getting started with AI generation.",
    price: "$0",
    priceSuffix: "/ month",
    features: [
      { text: "10,000 AI words per month" },
      { text: "Up to 5 active projects" },
      { text: "Access to basic templates" },
      { text: "Community forum support" },
    ],
    buttonText: "Free",
    isPopular: false,
  },
  {
    id: "creator",
    title: "Creator",
    description: "Designed for content creators and professionals scaling their output.",
    price: "$29",
    priceSuffix: "/ month",
    features: [
      { text: "100,000 AI words per month" },
      { text: "Unlimited active projects" },
      { text: "Advanced premium templates" },
      { text: "Custom brand voice training" },
      { text: "Priority email support" },
      { text: "Up to 5 team members" },
    ],
    buttonText: "$29",
    isPopular: true,
  },
  {
    id: "agency",
    title: "Agency",
    description: "For established businesses and agencies needing maximum power.",
    price: "$199",
    priceSuffix: "/ month",
    features: [
      { text: "Unlimited AI word generation" },
      { text: "White-labeled client reports" },
      { text: "Full API access & documentation" },
      { text: "Dedicated account manager" },
      { text: "Unlimited team members" },
      { text: "Custom team onboarding" },
    ],
    buttonText: "$199",
    isPopular: false,
  },
];

export default function Pricing1Demo() {
  return (
    <div className="py-20 w-full flex justify-center items-center bg-background">
      <Pricing1 plans={dummyPlans} />
    </div>
  );
}
