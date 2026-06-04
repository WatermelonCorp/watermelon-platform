import { Contact2 } from "./index";
import { MdEmail, MdLocationCity, MdPhoneInTalk } from "react-icons/md";

export default function Contact2Demo() {
  return (
    <Contact2
      badge="Get in Touch"
      heading="Let's build something amazing"
      description="We're here to help and answer any question you might have. We look forward to hearing from you."
      contactMethods={[
        {
          id: "email",
          icon: <MdEmail className="w-4 h-4" />,
          label: "hello@acme.inc",
        },
        {
          id: "address",
          icon: <MdLocationCity className="w-4 h-4" />,
          label: "789 Enterprise Way, Austin, TX",
        },
        {
          id: "phone",
          icon: <MdPhoneInTalk className="w-4 h-4" />,
          label: "+1 (800) 555-0199",
        },
      ]}
      form={{
        topics: [
          { value: "sales", label: "Sales & Pricing" },
          { value: "support", label: "Technical Support" },
          { value: "partnership", label: "Partnership Opportunities" },
          { value: "press", label: "Press & Media" },
        ],
        submitButtonText: "Send Inquiry",
      }}
    />
  );
}
