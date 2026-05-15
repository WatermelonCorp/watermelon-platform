import { Contact5 } from './index';
import { FaEnvelope, FaHeadset, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact5Demo() {
  return (
    <Contact5
      badge="Get in Touch"
      heading="Let’s build something great together"
      description="Have questions about our platform, partnerships, or product features? Our team is here to support you every step of the way."
      contactMethods={[
        {
          id: 'email',
          icon: FaEnvelope,
          title: 'Email Us',
          description:
            'Send us your questions and we’ll respond within 24 hours.',
          details: 'hello@wateremelonui.dev',
        },
        {
          id: 'support',
          icon: FaHeadset,
          title: 'Live Support',
          description:
            'Talk directly with our support specialists for quick help.',
          details: '+1 (800) 247-9082',
        },
        {
          id: 'office',
          icon: FaMapMarkerAlt,
          title: 'Studio Location',
          description:
            'Visit our creative workspace and meet the team in person.',
          details: '221 Market Street, San Francisco, CA 94105',
        },
      ]}
      footerText="We’re committed to delivering fast support, thoughtful solutions, and a smooth experience from start to finish."
    />
  );
}
