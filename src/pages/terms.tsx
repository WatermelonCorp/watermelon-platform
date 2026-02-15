import { SEOHead } from "@/components/seo-head";
import { DocPage, DocHeader, DocSection, DocText, DocCard } from "@/components/docs";

export default function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Use"
        description="Terms of use for Watermelon UI."
        keywords="terms, legal, watermelon ui"
      />

      <DocPage>
        <DocHeader
          title="Terms of Use"
          description="Rules and conditions for using Watermelon UI."
        />

        <DocSection title="Acceptance">
          <DocText>
            By accessing or using Watermelon UI, you agree to these terms. If you do
            not agree, please do not use the website or its materials.
          </DocText>
        </DocSection>

        <DocSection title="Use of Content">
          <DocText>
            You may browse, copy, and use components from this website in line with
            the relevant licenses and repository terms. You are responsible for
            ensuring your own project complies with your legal and licensing needs.
          </DocText>
        </DocSection>

        <DocSection title="Inspiration and Originality">
          <DocCard>
            <DocText>
              We do not intentionally copy proprietary source code from other
              creators. We may take visual inspiration from publicly shared designs
              and build implementations ourselves. Where known, we provide credit in
              the “Inspired By” section.
            </DocText>
          </DocCard>
        </DocSection>

        <DocSection title="Claims and Disputes">
          <DocText>
            If you believe a design or implementation on this site is yours and is
            being used improperly, email us at <a href="mailto:watermeloncorpui@gmail.com" className="bg-muted px-2 py-px rounded-sm text-black dark:text-white">watermeloncorpui@gmail.com</a>{" "}
            with proof (original source links, timestamps, repository links, or
            equivalent evidence).
          </DocText>
          <DocText>
            We will review and resolve valid claims within <strong>7-15 days</strong>.
            Resolution may include attribution updates, modification, or r%semoval.
          </DocText>
        </DocSection>

        <DocSection title="Disclaimer">
          <DocText>
            The website and materials are provided “as is” without warranties of any
            kind. We are not liable for losses resulting from your use of the site or
            code.
          </DocText>
        </DocSection>
      </DocPage>
    </>
  );
}

