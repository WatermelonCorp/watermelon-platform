"use client";

import { ComposeEmailCard } from "./index";

type User = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

type Attachment = {
  id: string;
  name: string;
  type: string;
  size: string;
  icon: "PDF" | "IMAGE" | "DOC";
};

type EmailData = {
  from: User;
  to: User[];
  subject: string;
  body: string;
  attachments: Attachment[];
};

export default function ComposeEmailCardDemo() {
  const sampleData: EmailData = {
    from: {
      id: "1",
      name: "Liam Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
      email: "liam@zentra.com",
    },
    to: [
      {
        id: "2",
        name: "Sophie Turner",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
        email: "sophie@finpay.com",
      },
      {
        id: "3",
        name: "Jackson Miller",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jackson",
        email: "jackson@finpay.com",
      },
    ],
    subject: "Quick intro — Zentra CRM",
    body: `Hi guys,

I'm Liam Johnson, Head of Product at Zentra. We're building a CRM focused on helping teams manage clients, deals, and internal workflows in one clean, flexible system.`,
    attachments: [
      {
        id: "a1",
        name: "Zentra overview",
        type: "pdf",
        size: "17 MB",
        icon: "PDF",
      },
      {
        id: "a2",
        name: "Zentra use case FinTech",
        type: "pdf",
        size: "17 MB",
        icon: "PDF",
      },
    ],
  };

  return (
    <ComposeEmailCard
      data={sampleData}
      onSend={(data) => console.log("Sent Email:", data)}
      onClose={() => console.log("Card Closed")}
    />
  );
}
