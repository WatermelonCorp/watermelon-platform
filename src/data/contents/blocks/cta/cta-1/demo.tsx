import { Cta1 } from "./index";
import {  FaArrowRight } from "react-icons/fa";

export default function Cta1Demo() {
  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center p-4">
      <Cta1
        title="Supercharge your team's productivity"
        description="Unlock all premium features today and take your workflow to the next level."
        buttonText="Get Started Now"
        buttonIcon={<FaArrowRight className="h-4 w-4" />}
        onButtonClick={() => alert("CTA clicked!")}
      />
    </div>
  );
}
