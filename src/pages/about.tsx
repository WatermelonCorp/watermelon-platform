import { SEOHead } from '@/components/seo-head';
import { DocPage, DocHeader, DocSection, DocText, DocCard } from '@/components/docs';

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About"
        description="About Watermelon UI, the open-source component and block ecosystem built for the community."
        keywords="about watermelon ui, open source ui, react blocks, community"
      />

      <DocPage>
        <DocHeader
          title="About Watermelon UI"
          description="Why the project exists, what it covers, and how the community helps shape it."
        />

        <DocSection title="What Watermelon Is">
          <DocText>
            Watermelon UI is an open-source interface ecosystem focused on practical building blocks for modern React products. The platform combines animated components, UI sections, dashboards, templates, documentation, and contributor-facing guidance in one place so teams can move from inspiration to implementation quickly. We are intentionally building a library that is approachable for solo developers, useful for startups, and still organized enough for product teams that care about maintainability.
          </DocText>
          <DocText>
            The public site at `ui.watermelon.sh` is the discovery layer. It helps people browse examples, inspect code, compare variants, and understand how pieces fit together before copying anything into their own projects. The goal is not to overwhelm people with abstract design-system theory. The goal is to help builders find a strong starting point, understand it fast, and adapt it confidently.
          </DocText>
        </DocSection>

        <DocSection title="How We Work">
          <DocCard>
            <DocText>
              Watermelon is community-friendly by design. We want contributions that improve code quality, accessibility, documentation, SEO, AI discoverability, install flows, and the actual components themselves. A strong contribution does not need to be flashy. Clearer docs, a cleaner content model, safer dependencies, or a better example composition can be just as valuable as a brand-new visual asset.
            </DocText>
          </DocCard>
        </DocSection>

        <DocSection title="Why Open Source Matters Here">
          <DocText>
            We keep the ecosystem open because UI work gets better when people can inspect the actual implementation, learn from it, and send improvements back. Watermelon is free for the community to explore and use, and sponsorship support helps keep that sustainable over time. That support goes into maintenance, hosting, design iteration, contributor experience, and ongoing quality work across the ecosystem.
          </DocText>
        </DocSection>
      </DocPage>
    </>
  );
}
