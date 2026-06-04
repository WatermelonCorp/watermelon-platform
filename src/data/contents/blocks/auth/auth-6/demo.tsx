import { Auth6 } from ".";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";

export default function Auth6Demo() {
  return (
    <Auth6
      heading="Get started with Watermelon"
      description="Launch your next project in seconds. Sign up or log in below."
      socialProviders={[
        {
          label: "Google",
          icon: <FaGoogle className="h-4 w-4" />,
          onClick: () => console.log("Google auth"),
        },
        {
          label: "GitHub",
          icon: <FaGithub className="h-4 w-4" />,
          onClick: () => console.log("GitHub auth"),
        },
        {
          label: "Apple",
          icon: <FaApple className="h-4 w-4" />,
          onClick: () => console.log("Apple auth"),
        },
      ]}
      dividerText="or"
      emailPlaceholder="your@email.com"
      emailButtonLabel="Continue with email"
      legalPrefix="By proceeding, you accept our"
      legalLinks={[
        { text: "Terms of Service", href: "#" },
        { text: "Privacy Policy", href: "#" },
      ]}
      legalConjunction="and the"
      onEmailSubmit={(email) => console.log("Email submitted:", email)}
    />
  );
}
