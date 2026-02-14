import { SEOHead } from "@/components/seo-head";
import { DocPage, DocHeader, DocSection, DocText, DocCard } from "@/components/docs";

export default function CopyrightPage() {
  return (
    <>
      <SEOHead
        title="Copyright & Attribution Policy"
        description="Watermelon UI copyright, inspiration, and attribution policy."
        keywords="copyright, attribution, inspired by, dmca, watermelon ui"
      />

      <DocPage>
        <DocHeader
          title="Copyright & Attribution Policy"
          description="Our policy for inspiration, credit, and ownership claims."
        />

        <DocSection title="Our Policy">
          <DocCard>
            <DocText>
              We do not intentionally take proprietary source code from other
              creators. We may reference visuals as inspiration and implement from
              scratch.
            </DocText>
            <DocText>
              When a source is known, we add explicit credit under “Inspired By”.
            </DocText>
          </DocCard>
        </DocSection>

        <DocSection title="If You Own a Design Featured Here">
          <DocText>
            If you believe a design shown on this site is yours and is used without
            proper permission or attribution, email us at{" "}
            <a href="mailto:watermeloncorpui@gmail.com" className="bg-muted px-2 py-px rounded-sm text-black dark:text-white">watermeloncorpui@gmail.com</a> with proof.
          </DocText>
          <DocText>
            Please include direct source links, publication dates, repository or file
            history, and any other evidence that helps verify ownership.
          </DocText>
        </DocSection>

        <DocSection title="Review Timeline">
          <DocText>
            We aim to resolve valid reports within <strong>7-15 days</strong>. Actions
            may include adding credit, updating implementation, or removing content.
          </DocText>
        </DocSection>
      </DocPage>
    </>
  );
}

