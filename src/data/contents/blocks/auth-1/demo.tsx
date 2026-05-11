import { Auth1 } from "./index";
import { MdBolt, MdShield, MdBarChart } from "react-icons/md";

export default function Auth1Demo() {
  return (
    <Auth1

      features={[
        {
          icon: <MdBolt className="h-5 w-5" />,
          title: "Blazing-fast onboarding",
          description: "Get your team up and running in minutes, not days.",
        },
        {
          icon: <MdShield className="h-5 w-5" />,
          title: "Enterprise-grade security",
          description:
            "SOC 2 certified with end-to-end encryption by default.",
        },
        {
          icon: <MdBarChart className="h-5 w-5" />,
          title: "Real-time analytics",
          description:
            "Track every metric that matters — live, at a glance.",
        },
      ]}
      submitLabel="Sign in"
      signUpHref="#signup"
      forgotPasswordHref="#forgot"
    />
  );
}
