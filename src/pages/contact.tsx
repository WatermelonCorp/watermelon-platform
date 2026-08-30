import { SEOHead } from '@/components/seo-head';
import { DocPage, DocHeader, DocSection, DocText, DocCard } from '@/components/docs';

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact"
        description="How to contact the Watermelon UI team for support, partnerships, security, and contributor questions."
        keywords="contact watermelon ui, support, sponsorship, security"
      />

      <DocPage>
        <DocHeader
          title="Contact"
          description="The best ways to reach Watermelon UI depending on what you need."
        />

        <DocSection title="General Contact">
          <DocText>
            For general questions, contributor coordination, feedback about the site, or partnership inquiries, email <a href="mailto:watermeloncorpui@gmail.com" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">watermeloncorpui@gmail.com</a>. That is the primary contact path we expose publicly for the project today. If you are reaching out about a specific repository or page, include the relevant URL and a short explanation of the change, bug, or idea so we can triage it faster.
          </DocText>
        </DocSection>

        <DocSection title="Security and Content Reports">
          <DocCard>
            <DocText>
              If you need to report a security issue, licensing concern, attribution problem, or a page that should be corrected, please include as much concrete evidence as possible. Helpful context includes reproduction steps, screenshots, repository links, timestamps, and a clear statement of the impact. That helps us respond responsibly and reduce unnecessary back-and-forth when the issue is time-sensitive.
            </DocText>
          </DocCard>
        </DocSection>

        <DocSection title="Community and Sponsorship">
          <DocText>
            Watermelon is built for the wider builder community, and we want support conversations to stay straightforward. If you want to sponsor the work, collaborate on ecosystem improvements, or help us shape public contribution paths such as showcases and registries, mention that explicitly in your email. We use those conversations to prioritize work that keeps more of the ecosystem free, usable, and well-maintained for everyone.
          </DocText>
        </DocSection>
      </DocPage>
    </>
  );
}
