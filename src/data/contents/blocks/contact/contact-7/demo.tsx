import { Contact7 } from "./index";

export default function Contact7Demo() {
  return (
    <Contact7
      subheading="CONNECT WITH US"
      heading="Let's Start a Conversation"
      nameLabel="Full Name *"
      namePlaceholder="John Doe"
      emailLabel="Email Address *"
      emailPlaceholder="john@example.com"
      phoneLabel="Phone Number *"
      phonePlaceholder="+1 (555) 000-0000"
      enquiryLabel="Enquiry Type *"
      enquiryPlaceholder="Select an enquiry type"
      enquiryOptions={[
        { value: "general", label: "General Inquiry" },
        { value: "support", label: "Technical Support" },
        { value: "sales", label: "Sales & Pricing" },
        { value: "partnership", label: "Partnership Opportunities" },
      ]}
      messageLabel="Message *"
      messagePlaceholder="How can we help you today? Please provide as much detail as possible."
      agreementText="I agree to the privacy policy and terms of service for this communication."
      buttonText="Send Message"
    />
  );
}
