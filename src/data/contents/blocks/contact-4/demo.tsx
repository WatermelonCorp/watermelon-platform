import ContactSolutionForm from "../contact-4";

export default function Contact4Demo() {
    return (
        <ContactSolutionForm
            badge="Sustainable Futures"
            headline="Grow Your"
            headlineAccent="Green Business"
            subheadline="We partner with founders and enterprises to design eco-forward strategies that drive measurable impact."
            contactInfo={{
                email: "hello@wm.studio",
                phone: "+91 98765 43210",
            }}
            serviceOptions={[
                { value: "strategy", label: "Sustainability Strategy" },
                { value: "audit", label: "Carbon Audit & Reporting" },
                { value: "supply", label: "Supply Chain Consulting" },
                { value: "branding", label: "Green Branding" },
                { value: "other", label: "Something Else" },
            ]}
            ctaLabel="Send My Request"
            onSubmit={(data) => console.log("Submitted:", data)}
        />
    )
}