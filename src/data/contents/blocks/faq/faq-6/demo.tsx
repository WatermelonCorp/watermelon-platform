import { Faq6 } from './index';

const faqs = [
  {
    id: 'item-1',
    question: 'How should we interpret "no wallet pairing" here?',
    answer:
      'Legend Atlas includes several approved tokens, networks, and chains. Every component comes directly embedded within the platform, forming a flexible web of connections. All parts operate smoothly together, yet this also implies Atlas cannot enable every possible onchain service available today globally.',
  },
  {
    id: 'item-2',
    question: 'Which networks are currently supported?',
    answer:
      'We support a variety of major networks including Ethereum, Polygon, Arbitrum, and Optimism, with more being added based on community demand and security assessments.',
  },
  {
    id: 'item-3',
    question: 'Can we connect external onchain services?',
    answer:
      'While Atlas provides a comprehensive suite of built-in tools, connecting external services requires specific integration adapters which are currently in beta testing.',
  },
  {
    id: 'item-4',
    question: 'Why are only selected assets available?',
    answer:
      'Asset selection is strictly curated based on liquidity, security audits, and regulatory compliance to ensure the highest standard of safety for our users.',
  },
  {
    id: 'item-5',
    question: 'How does the system handle compatibility and onchain services?',
    answer:
      'Our architecture abstracts the complexities of cross-chain communication, offering a unified API that handles translation and state verification automatically.',
  },
  {
    id: 'item-6',
    question: 'Is manual connection required for supported wallets?',
    answer:
      'No, supported wallets benefit from auto-discovery and seamless connection protocols, requiring only a one-time authorization signature.',
  },
];

export default function Faq6Demo() {
  return (
    <div className="bg-background w-full py-24 px-4">
      <Faq6
        badge="FAQ"
        title={
          <>
            Your Guide to
            <br />
            finance.
          </>
        }
        faqs={faqs}
      />
    </div>
  );
}
