import Footer22 from "./index";

export default function Footer22Demo() {
  const customOfferColumns = [
    {
      title: "Solutions",
      links: [
        { label: "Developer Platform", href: "#" },
        { label: "UI Registry", href: "#" },
        { label: "Vite Templates", href: "#" },
        { label: "Enterprise Support", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Component Docs", href: "#" },
        { label: "Design Principles", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Security & Trust", href: "#" },
        { label: "Legal", href: "#" },
      ],
    },
  ];

  const customBottomLinks = [
    { label: "About Watermelon", href: "#" },
    { label: "Developer License", href: "#" },
    { label: "GitHub Repository", href: "https://github.com/watermelon" },
  ];

  return (
    <div className="flex w-full items-end bg-white dark:bg-[#0a0a0a]">
      <Footer22
        brandName="Watermelon"
        offerColumns={customOfferColumns}
        newsletterHeadline="Subscribe for Component Updates"
        newsletterDescription="Get the latest premium UI components and code snippets in your inbox."
        contactHeading="Need Custom Work?"
        contactDescription="Our expert designers and engineers can help you build bespoke interface systems."
        emailContact="hello@watermelon.sh"
        bottomLinks={customBottomLinks}
      />
    </div>
  );
}
