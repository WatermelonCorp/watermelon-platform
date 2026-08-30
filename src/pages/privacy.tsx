import { SEOHead } from "@/components/seo-head";
import { DocPage, DocHeader, DocSection, DocText, DocCard } from "@/components/docs";

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Privacy policy for Watermelon UI."
        keywords="privacy policy, data, analytics, watermelon ui"
      />

      <DocPage>
        <DocHeader
          title="Privacy Policy"
          description="How we handle analytics and basic usage data on Watermelon UI."
        />

        <DocSection title="Information We Collect">
          <DocText>
            We may collect limited technical and usage information such as page views,
            interaction events, browser/device metadata, and referral information to
            improve the product experience.
          </DocText>
        </DocSection>

        <DocSection title="Analytics Tools">
          <DocCard>
            <DocText>
              We use analytics providers (such as GA4 and PostHog) to understand
              traffic and product usage patterns. If your browser blocks analytics
              scripts, some tracking may not run.
            </DocText>
          </DocCard>
        </DocSection>

        <DocSection title="How We Use Data">
          <DocText>
            We use collected data for product improvements, troubleshooting, feature
            planning, and performance monitoring. We do not collect unnecessary
            sensitive personal data through normal site usage.
          </DocText>
          <DocText>
            Watermelon UI is a public browsing and discovery platform, not a personal account system with complex user data storage. That means our normal privacy posture is intentionally simple: gather only the technical and usage signals required to understand whether pages load correctly, whether documentation is helping, and where the product experience still has friction. If we introduce new flows that collect materially different data in the future, this page should be updated to reflect that clearly rather than hidden behind vague legal wording.
          </DocText>
        </DocSection>

        <DocSection title="Contact">
          <DocText>
            For privacy-related requests, contact{" "}
            <a href="mailto:watermeloncorpui@gmail.com" className="bg-muted px-2 py-px rounded-sm text-black dark:text-white">watermeloncorpui@gmail.com</a>.
          </DocText>
        </DocSection>
      </DocPage>
    </>
  );
}
